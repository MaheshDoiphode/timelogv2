namespace timelogcore.Models{
public class TimeLogDto
{
    public string? EmployeeName { get; set; }
    public string EmployeeId { get; set; }

    public string? ActivityType { get; set; }
    public string? ProjectName { get; set; }
    public string? ProjectCode { get; set; }
    public string? CostCentre { get; set; }
    public string? SvcDelCentre { get; set; }
    public string? ProjectType { get; set; }
    public string? ProjectManager { get; set; }
    public string? ProjectDirector { get; set; }
    public string? ProjectDeliveryLead { get; set; }
    public string? Level1 { get; set; }
    public string? Level2 { get; set; }
    public string? ActivityGroup { get; set; }
    public string? TaskType { get; set; }
    public string? TaskUniqueId { get; set; }
    public string? TaskName { get; set; }
    public string? Remark { get; set; }
    public DateTime? Period { get; set; }
    public DateTime? TimeLogDate { get; set; }
    public decimal? Effort { get; set; }
    public decimal? TotalEffort { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? UpdatedTime { get; set; }
    public string? HomeBaseDivision { get; set; }
    public string? HomeBaseCentre { get; set; }
    public string? HomeBaseTeam { get; set; }
    public string? ProjectBaseDivision { get; set; }
    public string? ProjectBaseCentre { get; set; }
    public string? ProjectBaseTeam { get; set; }
    public DateTime? JoiningDate { get; set; }
    public DateTime? LeavingDate { get; set; }
    public decimal? ProjectPlannedEffortsInGteledmsOnly { get; set; }
    public string? AmForBidSupport { get; set; }
    public string? AmBusinessCentreForBidSupport { get; set; }
}
}