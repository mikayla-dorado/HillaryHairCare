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
            new Stylist {Id = 1, Name = "Keely", ServiceId = 1}

        });
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Highlights", Price = 120.00M}
        });
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, Name = "Jaylee", Email = "j@gmail.com"}
        });
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, Time = new DateTime(2024, 2, 4, 10, 0, 0), CustomerId = 1, StylistId = 1}
        });
        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService {Id = 1, ServiceId = 1, AppointmentId = 1}
        });
    }
}