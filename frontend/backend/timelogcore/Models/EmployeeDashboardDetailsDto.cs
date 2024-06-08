namespace timelogcore.Models
{

    public class EmployeeDashboardDetailsDto
    {
        public TimeLogDto? TimeLog { get; set; }
        public decimal AverageEfforts { get; set; }
        public decimal AverageTotalEfforts { get; set; }
        public List<EmployeeCountPerMonthDto>? EmployeeCountPerMonth { get; set; }
        public List<ActivityDetails>? ActivityDetails { get; set; }
        public List<ProjectManagerDetails>? ProjectManagerDetails { get; set; }
    }

    public class ProjectManagerDetails
    {
        public string? Name { get; set; }
        public int TotalEmployeesUnderManager { get; set; }
    }

    public class ActivityDetails
    {
        public string? Name { get; set; }
        public int TotalEmployeesUnderActivity { get; set; }
    }
}