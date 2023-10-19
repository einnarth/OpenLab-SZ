using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenLab_SZ.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuildMemberCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MembersCount",
                table: "Guilds",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MembersCount",
                table: "Guilds");
        }
    }
}
