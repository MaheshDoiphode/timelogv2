using timelogcore.Models;
namespace timelogcore.Services
{
    public interface ITimeLogService
    {
        Task<List<TimeLogDto>> GetTimeLogs();
        Task<List<TimeLogDto>> SearchTimeLogs(SearchDataDto searchData);

        Task<List<EmployeeCountPerMonthDto>> GetEmployeeCountPerMonth(int count);

        Task<EmployeeDashboardDetailsDto> GetEmployeeDetails(string employeeId);

    }
}