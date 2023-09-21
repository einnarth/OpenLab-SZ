using Microsoft.AspNetCore.Identity;

namespace OpenLab_SZ.Models;

public class ApplicationUser : IdentityUser
{
    public string? Guild {  get; set; }
    public int Xp {  get; set; }
    
}

