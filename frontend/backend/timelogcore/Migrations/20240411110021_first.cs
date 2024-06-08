using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace timelogcore.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "timelog",
                columns: table => new
                {
                    employeeid = table.Column<string>(type: "text", nullable: false),
                    employeename = table.Column<string>(type: "text", nullable: true),
                    activitytype = table.Column<string>(type: "text", nullable: true),
                    projectname = table.Column<string>(type: "text", nullable: true),
                    projectcode = table.Column<string>(type: "text", nullable: true),
                    costcentre = table.Column<string>(type: "text", nullable: true),
                    svcdelcentre = table.Column<string>(type: "text", nullable: true),
                    projecttype = table.Column<string>(type: "text", nullable: true),
                    projectmanager = table.Column<string>(type: "text", nullable: true),
                    projectdirector = table.Column<string>(type: "text", nullable: true),
                    projectdeliverylead = table.Column<string>(type: "text", nullable: true),
                    level1 = table.Column<string>(type: "text", nullable: true),
                    level2 = table.Column<string>(type: "text", nullable: true),
                    activitygroup = table.Column<string>(type: "text", nullable: true),
                    tasktype = table.Column<string>(type: "text", nullable: true),
                    taskuniqueid = table.Column<string>(type: "text", nullable: true),
                    taskname = table.Column<string>(type: "text", nullable: true),
                    remark = table.Column<string>(type: "text", nullable: true),
                    period = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    timelogdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    effort = table.Column<decimal>(type: "numeric", nullable: true),
                    total_effort = table.Column<decimal>(type: "numeric", nullable: true),
                    createddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updatedtime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    homebasedivision = table.Column<string>(type: "text", nullable: true),
                    homebasecentre = table.Column<string>(type: "text", nullable: true),
                    homebaseteam = table.Column<string>(type: "text", nullable: true),
                    projectbasedivision = table.Column<string>(type: "text", nullable: true),
                    projectbasecentre = table.Column<string>(type: "text", nullable: true),
                    projectbaseteam = table.Column<string>(type: "text", nullable: true),
                    joiningdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    leavingdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    projectplannedeffortsingteledmsonly = table.Column<decimal>(type: "numeric", nullable: true),
                    amforbidsupport = table.Column<string>(type: "text", nullable: true),
                    ambusinesscentreforbidsupport = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_timelog", x => x.employeeid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "timelog");
        }
    }
}
