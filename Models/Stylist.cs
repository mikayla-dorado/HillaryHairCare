using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.SignalR;

namespace HillaryHairCare.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int ServiceId { get; set; }
    public List<Service> Services { get; set; }
    public bool Active { get; set; }
}