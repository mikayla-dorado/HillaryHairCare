using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int ServiceId { get; set; }
}