﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace OpenLab_SZ.Models
{
    public class Guild
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
        public ICollection<ApplicationUser> Users { get; set; }
        public int MembersCount { get; set; }
    }
}
