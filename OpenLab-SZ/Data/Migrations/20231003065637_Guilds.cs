using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenLab_SZ.Data.Migrations
{
    /// <inheritdoc />
    public partial class Guilds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Guilds",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guilds", x => x.Id);
                });

            migrationBuilder.InsertData(
       table: "Guilds",
       columns: new[] { "Id", "Name" },
       values: new object[] {"1", "Guild 1" });

            migrationBuilder.InsertData(
                table: "Guilds",
                columns: new[] { "Id", "Name" },
                values: new object[] {"2", "Guild 2" });

            migrationBuilder.InsertData(
                table: "Guilds",
                columns: new[] { "Id", "Name" },
                values: new object[] { "3", "Guild 3" });


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
