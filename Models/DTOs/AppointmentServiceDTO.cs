using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models.DTOs;

public class AppointmentServiceDTO
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
    public int ServiceId { get; set; }
}