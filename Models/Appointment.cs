using System.ComponentModel.DataAnnotations;
using HillaryHairCare.Models;

namespace HillaryHairCare.Models;

public class Appointment
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public int StylistId { get; set; }
    public List<Service> Services { get; set; }
    public List<AppointmentService> AppointmentServices { get; set; }
    public DateTime Time { get; set; }
    public Customer Customer { get; set; }
    public Stylist Stylist { get; set; }
      public List<int>? ServiceIds { get; set; }
}