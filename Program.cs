using HillaryHairCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using HillaryHairCare.Models.DTOs;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.Linq;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillaryHairCareDbContext>(builder.Configuration["HillaryHairCareDbConnectionString"]);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


//endpoints

//add a new customer
app.MapPost("/api/customers", (HillaryHairCareDbContext db, Customer customer) =>
{
    db.Customers.Add(customer);
    db.SaveChanges();
    return Results.Created($"/api/{customer.Id}", customer);
});

//get stylists
app.MapGet("/api/stylists", (HillaryHairCareDbContext db) =>
{
    return db.Stylists
    .Select(s => new StylistDTO
    {
        Id = s.Id,
        Name = s.Name,
        ServiceId = s.ServiceId,
        Active = s.Active,
        Appointments = db.Appointments
            .Where(a => a.StylistId == s.Id)
            .Select(a => new AppointmentDTO
            {
                Id = a.Id,
                StylistId = a.StylistId,
                CustomerId = a.CustomerId,
                Time = a.Time,
                Services = a.Services.Select(srv => new ServiceDTO
                {
                    Id = srv.Id,
                    Name = srv.Name,
                    Price = srv.Price
                }).ToList(),
            })
        .ToList()
    }).ToList();
});

//get services
app.MapGet("/api/services", (HillaryHairCareDbContext db) =>
{
    return db.Services.Select(s => new ServiceDTO
    {
        Id = s.Id,
        Name = s.Name,
        Price = s.Price
    });
});

//get customers
app.MapGet("/api/customers", (HillaryHairCareDbContext db) =>
{
    return db.Customers.Select(c => new CustomerDTO
    {
        Id = c.Id,
        Name = c.Name,
        Email = c.Email
    });
});

//deactivate (soft delete) a stylist
app.MapPost("/api/stylists/{id}/deactivate", (HillaryHairCareDbContext db, int id) =>
{
    Stylist stylistDeactivate = db.Stylists.SingleOrDefault(s => s.Id == id);
    if (stylistDeactivate == null)
    {
        return Results.NotFound("no matching id");
    }

    stylistDeactivate.Active = false;
    db.SaveChanges();
    return Results.Ok($"{stylistDeactivate.Name} has been deactivated");
});

//add a stylist
app.MapPost("/api/stylists", (HillaryHairCareDbContext db, Stylist stylist) =>
{
    try
    {
        db.Stylists.Add(stylist);
        db.SaveChanges();
        return Results.Created($"/api/stylists/{stylist.Id}", stylist);
    }
    catch
    {
        return Results.BadRequest("Enter a valid Service Name");
    }

});

//add a service
app.MapPost("/api/services", (HillaryHairCareDbContext db, Service service) =>
{
    try
    {
        db.Services.Add(service);
        db.SaveChanges();
        return Results.Created($"/api/services/{service.Id}", service);
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"Error: {ex.Message}");
    }
});

//get appointments
app.MapGet("/api/appointments", (HillaryHairCareDbContext db) =>
{
    return db.Appointments
    .Include(a => a.Customer)
    .Include(a => a.Stylist)
    .Select(a => new AppointmentDTO
    {
        Id = a.Id,
        Time = a.Time,
        CustomerId = a.CustomerId,
        StylistId = a.StylistId,
        Customer = new CustomerDTO
        {
            Id = a.Customer.Id,
            Name = a.Customer.Name
        },
        Stylist = new StylistDTO
        {
            Id = a.Stylist.Id,
            Name = a.Stylist.Name
        }
    });
});

//cancel/delete appointment
app.MapPost("/api/appointments/{id}/delete", (HillaryHairCareDbContext db, int id) =>
{
    Appointment appointmentDelete = db.Appointments.SingleOrDefault(a => a.Id == id);
    if (appointmentDelete == null)
    {
        return Results.NotFound();
    }
    db.Appointments.Remove(appointmentDelete);
    db.SaveChanges();
    return Results.NoContent();
});

//add addpointment
app.MapPost("/api/appointments", (HillaryHairCareDbContext db, Appointment appointment) =>
{
    var addAppt = new Appointment
    {
        CustomerId = appointment.CustomerId,
        StylistId = appointment.StylistId,
        Time = appointment.Time
    };

    db.Appointments.Add(addAppt);
    db.SaveChanges();

    foreach (var service in appointment.Services)
    {
        var aService = new AppointmentService
        {
            AppointmentId = addAppt.Id,
            ServiceId = service.Id
        };
        db.AppointmentServices.Add(aService);
    }

    db.SaveChanges();
    return Results.Created($"/api/{appointment.Id}", appointment);
});

//get appointments by id
app.MapGet("/api/appointments/{id}", (HillaryHairCareDbContext db, int id) =>
{

    List<Service> foundServices = db.AppointmentServices
        .Where(apt => apt.AppointmentId == id)
        .Join(db.Services,
        apt => apt.ServiceId,
        s => s.Id,
        (apt, s) => s).ToList();

    Appointment foundAppointment = db.Appointments
        .Include(a => a.Stylist)
        .Include(a => a.Customer)
        .FirstOrDefault(a => a.Id == id);


    if (foundAppointment == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(new AppointmentDTO
    {
        Id = foundAppointment.Id,
        StylistId = foundAppointment.StylistId,
        CustomerId = foundAppointment.CustomerId,
        Time = foundAppointment.Time,
        Services = foundServices.Select(s => new ServiceDTO
        {
            Id = s.Id,
            Name = s.Name,
            Price = s.Price
        }).ToList(),
        Customer = new CustomerDTO
        {
            Id = foundAppointment.Customer.Id,
            Name = foundAppointment.Customer.Name,
            Email = foundAppointment.Customer.Email
        },
        Stylist = new StylistDTO
        {
            Id = foundAppointment.Stylist.Id,
            Name = foundAppointment.Stylist.Name,
            Active = foundAppointment.Stylist.Active
        }
    });
});

//get appointment services
app.MapGet("/api/appointmentservices", (HillaryHairCareDbContext db) =>
{
    return db.AppointmentServices.Select(s => new AppointmentServiceDTO
    {
        Id = s.Id,
        AppointmentId = s.AppointmentId,
        ServiceId = s.ServiceId
    });
});

//update appointment services
app.MapPut("/api/appointments/{id}", (HillaryHairCareDbContext db, int id, Appointment appointment) =>
{
    Appointment existingAppointment = db.Appointments.SingleOrDefault(a => a.Id == id);
    if (existingAppointment == null)
    {
        return Results.NotFound();
    }
    existingAppointment.Time = appointment.Time;
    existingAppointment.CustomerId = appointment.CustomerId;
    existingAppointment.StylistId = appointment.StylistId;

    db.SaveChanges();

    return Results.NoContent();

});



app.Run();