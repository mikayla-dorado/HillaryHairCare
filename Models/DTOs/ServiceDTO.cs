using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models.DTOs;

public class ServiceDTO
{
    public int Id { get; set; }
    // public int AppointmentId { get; set; }
    // public int ServiceId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}