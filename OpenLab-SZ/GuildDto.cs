using OpenLab_SZ.Models;

namespace OpenLab_SZ
{
    public class GuildDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
        public ICollection<ApplicationUser> Users { get; set; }
        public int MembersCount { get; set; }
        public int CurrentMembersCount { get; set; }
    }
}
