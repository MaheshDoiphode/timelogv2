using timelogcore.Models;
namespace timelogcore.Repositories
{
    public interface ITimeLogRepository
    {
        Task<List<TimeLogDto>> GetTimeLogs();
        Task<List<TimeLogDto>> SearchTimeLogs(SearchDataDto searchData);
        Task<List<EmployeeCountPerMonthDto>> GetEmployeeCountPerMonth(int count);
        Task<EmployeeDashboardDetailsDto> GetEmployeeDetails(string employeeId);
    }
}