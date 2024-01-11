using Microsoft.EntityFrameworkCore;
using HillaryHairCare.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;

public class HillaryHairCareDbContext : DbContext
{
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    public HillaryHairCareDbContext(DbContextOptions<HillaryHairCareDbContext> context) : base(context) 
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, Name = "Keely", ServiceId = 1},
            new Stylist {Id = 2, Name = "JP", ServiceId = 2},
            new Stylist {Id = 3, Name = "Jose", ServiceId = 3},
            new Stylist {Id = 4, Name = "Tamatha", ServiceId = 4},
            new Stylist {Id = 5, Name = "Hillary", ServiceId = 1}
        });
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Highlights", Price = 120.00M},
            new Service {Id = 2, Name = "Haircut", Price = 20.00M},
            new Service {Id = 3, Name = "Beard Trim", Price = 8.00M},
            new Service {Id = 4, Name = "All-Over Color", Price = 80.00M}
        });
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, Name = "Jaylee", Email = "j@gmail.com"},
            new Customer {Id = 2, Name = "Ely", Email = "e@gmail.com"},
            new Customer {Id = 3, Name = "Reiken", Email = "r@gmail.com"},
            new Customer {Id = 4, Name = "Marlana", Email = "m@gmail.com"},
            new Customer {Id = 5, Name = "Garry", Email = "g@gmail.com"},
        });
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, Time = new DateTime(2024, 2, 4, 10, 0, 0), CustomerId = 1, StylistId = 1},
            new Appointment {Id = 2, Time = new DateTime(2024, 2, 5, 8, 0, 0), CustomerId = 5, StylistId = 2},
            new Appointment {Id = 3, Time = new DateTime(2024, 2, 4, 11, 0, 0), CustomerId = 3, StylistId = 3},
            new Appointment {Id = 4, Time = new DateTime(2024, 2, 3, 9, 0, 0), CustomerId = 2, StylistId = 3},
            new Appointment {Id = 5, Time = new DateTime(2024, 2, 4, 2, 0, 0), CustomerId = 4, StylistId = 5},
        });
        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService {Id = 1, ServiceId = 1, AppointmentId = 1},
            new AppointmentService {Id = 2, ServiceId = 1, AppointmentId = 2},
            new AppointmentService {Id = 3, ServiceId = 3, AppointmentId = 3},
            new AppointmentService {Id = 4, ServiceId = 3, AppointmentId = 4},
            new AppointmentService {Id = 5, ServiceId = 1, AppointmentId = 5}
        });
    }
}