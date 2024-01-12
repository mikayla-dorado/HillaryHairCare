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






app.Run();