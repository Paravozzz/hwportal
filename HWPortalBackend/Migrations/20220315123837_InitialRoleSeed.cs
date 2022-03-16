using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HWPortalBackend.Migrations
{
    public partial class InitialRoleSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5b81b53a-32db-4ee2-b3e3-139438f6d265", "c72c8d7c-fb89-4473-92a7-e768062c1e8e", "Administrator", "ADMINISTRATOR" },
                    { "8b224b02-a14d-42ca-8124-3084685f07d9", "e9531dcd-b110-4f44-b79f-7374945ecf55", "User", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b81b53a-32db-4ee2-b3e3-139438f6d265");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b224b02-a14d-42ca-8124-3084685f07d9");
        }
    }
}
