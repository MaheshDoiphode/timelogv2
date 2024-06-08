using timelogcore.Models;
using timelogcore.Repositories;

namespace timelogcore.Services
{
    public class TimeLogService : ITimeLogService
    {
        private readonly ITimeLogRepository _timeLogRepository;

        public TimeLogService(ITimeLogRepository timeLogRepository)
        {
            _timeLogRepository = timeLogRepository;
        }

        public async Task<EmployeeDashboardDetailsDto> GetEmployeeDetails(string employeeId)
        {
            return await _timeLogRepository.GetEmployeeDetails(employeeId);
        }


        public async Task<List<EmployeeCountPerMonthDto>> GetEmployeeCountPerMonth(int count)
        {
            return await _timeLogRepository.GetEmployeeCountPerMonth(count);
        }


        public async Task<List<TimeLogDto>> GetTimeLogs()
        {
            return await _timeLogRepository.GetTimeLogs();

        }
        public async Task<List<TimeLogDto>> SearchTimeLogs(SearchDataDto searchData)
        {
            return await _timeLogRepository.SearchTimeLogs(searchData);
        }

     
    }
}