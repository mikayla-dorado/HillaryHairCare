using System.ComponentModel.DataAnnotations;
using HillaryHairCare.Models.DTOs;

namespace HillarysHairCare.Models.DTOs;

public class AppointmentDTO
{
  public int Id { get; set; }
  public int StylistId { get; set; }
  public int CustomerId { get; set; }
  public List<ServiceDTO> Services { get; set; }
  public DateTime ApptTime { get; set; }
  public StylistDTO Stylist { get; set; }
  public CustomerDTO Customer { get; set; }
}