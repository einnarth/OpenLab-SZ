using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenLab_SZ.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuildMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
       table: "Guilds",
       columns: new[] { "Name" },
       values: new object[] { "Guild 1" });

            migrationBuilder.InsertData(
                table: "Guilds",
                columns: new[] { "Name" },
                values: new object[] { "Guild 2" });

            migrationBuilder.InsertData(
                table: "Guilds",
                columns: new[] { "Name" },
                values: new object[] { "Guild 3" });
        
    }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
