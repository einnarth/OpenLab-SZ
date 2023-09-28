using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace OpenLab_SZ.Models
{
    public class Guild
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}
