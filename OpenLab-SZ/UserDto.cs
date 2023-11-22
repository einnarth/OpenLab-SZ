using System.ComponentModel.DataAnnotations;

namespace OpenLab_SZ
{
    public class UserDto
    {

        public string? Guild { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public int Xp { get; set; }

        
    }
}
