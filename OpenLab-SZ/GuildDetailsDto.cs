using OpenLab_SZ.Models;

namespace OpenLab_SZ
{
    public class GuildDetailsDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
        public int MembersCount { get; set; }
        public int CurrentMembersCount { get; set; }
        public IEnumerable<UserDto> Users { get; set; }
        public bool HasUserAnyGuild { get; set; }
        public bool HasUserThisGuild { get; set; }
    }
}
