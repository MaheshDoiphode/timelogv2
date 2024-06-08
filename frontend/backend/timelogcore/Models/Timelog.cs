using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace timelogcore.Models{
[Table("timelog")]
public class TimeLog
{
    [Key]
    [Column("employeeid")]
    public string EmployeeId { get; set; }

    [Column("employeename")]
    public string? EmployeeName { get; set; }

    [Column("activitytype")]
    public string? ActivityType { get; set; }

    [Column("projectname")]
    public string? ProjectName { get; set; }

    [Column("projectcode")]
    public string? ProjectCode { get; set; }

    [Column("costcentre")]
    public string? CostCentre { get; set; }

    [Column("svcdelcentre")]
    public string? SvcDelCentre { get; set; }

    [Column("projecttype")]
    public string? ProjectType { get; set; }

    [Column("projectmanager")]
    public string? ProjectManager { get; set; }

    [Column("projectdirector")]
    public string? ProjectDirector { get; set; }

    [Column("projectdeliverylead")]
    public string? ProjectDeliveryLead { get; set; }

    [Column("level1")]
    public string? Level1 { get; set; }

    [Column("level2")]
    public string? Level2 { get; set; }

    [Column("activitygroup")]
    public string? ActivityGroup { get; set; }

    [Column("tasktype")]
    public string? TaskType { get; set; }

    [Column("taskuniqueid")]
    public string? TaskUniqueId { get; set; }

    [Column("taskname")]
    public string? TaskName { get; set; }

    [Column("remark")]
    public string? Remark { get; set; }

    [Column("period")]
    public DateTime? Period { get; set; }

    [Column("timelogdate")]
    public DateTime? TimeLogDate { get; set; }

    [Column("effort")]
    public decimal? Effort { get; set; }

    [Column("total_effort")]
    public decimal? TotalEffort { get; set; }

    [Column("createddate")]
    public DateTime? CreatedDate { get; set; }

    [Column("updatedtime")]
    public DateTime? UpdatedTime { get; set; }

    [Column("homebasedivision")]
    public string? HomeBaseDivision { get; set; }

    [Column("homebasecentre")]
    public string? HomeBaseCentre { get; set; }

    [Column("homebaseteam")]
    public string? HomeBaseTeam { get; set; }

    [Column("projectbasedivision")]
    public string? ProjectBaseDivision { get; set; }

    [Column("projectbasecentre")]
    public string? ProjectBaseCentre { get; set; }

    [Column("projectbaseteam")]
    public string? ProjectBaseTeam { get; set; }

    [Column("joiningdate")]
    public DateTime? JoiningDate { get; set; }

    [Column("leavingdate")]
    public DateTime? LeavingDate { get; set; }

    [Column("projectplannedeffortsingteledmsonly")]
    public decimal? ProjectPlannedEffortsInGteledmsOnly { get; set; }

    [Column("amforbidsupport")]
    public string? AmForBidSupport { get; set; }

    [Column("ambusinesscentreforbidsupport")]
    public string? AmBusinessCentreForBidSupport { get; set; }
}}