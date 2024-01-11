using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models.DTOs;

public class StylistDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ServiceId { get; set; }
    public List<AppointmentDTO> Appointments { get; set; }
}