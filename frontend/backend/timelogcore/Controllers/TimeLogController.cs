using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using timelogcore.Models;
using timelogcore.Services;

namespace timelogcore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimeLogController : ControllerBase
    {
        private readonly ITimeLogService _timeLogService;
        public TimeLogController(ITimeLogService timeLogService)
        {
            _timeLogService = timeLogService;
        }

        // For Dashboard
        [HttpGet("user/{employeeId}")]
        public async Task<IActionResult> GetEmployeeDetails(string employeeId)
        {
            var details = await _timeLogService.GetEmployeeDetails(employeeId);
            if (details == null)
            {
                return NotFound("Not Found");
            }
            return Ok(details);
        }

        // http://localhost/Timelog/employee-count-per-month/3
        [HttpGet("employee-count-per-month/{count}")]
        public async Task<ActionResult<List<EmployeeCountPerMonthDto>>> GetEmployeeCountPerMonth(int count)
        {
            var employeeCountPerMonth = await _timeLogService.GetEmployeeCountPerMonth(count);
            return Ok(employeeCountPerMonth);
        }




        [HttpGet("all")]
        public async Task<ActionResult<List<TimeLogDto>>> GetTimeLogs()
        {
            var timeLogs = await _timeLogService.GetTimeLogs();
            return Ok(timeLogs);
        }

        [HttpPost("activityfilter")]
        public async Task<ActionResult<List<TimeLogDto>>> SearchTimeLogs(
            [FromBody] SearchDataDto searchData
        )
        {
            if (searchData.DateRange != null)
            {
                Console.WriteLine($"{searchData.DateRange.Start} - {searchData.DateRange.End}");
                searchData.ConvertDatesToUtc();
            }
            var timeLogs = await _timeLogService.SearchTimeLogs(searchData);
            return Ok(timeLogs);
        }
    }
}
