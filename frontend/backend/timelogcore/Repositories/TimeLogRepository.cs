using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using timelogcore.Data;
using timelogcore.Models;
using System.Globalization;

namespace timelogcore.Repositories
{
    public class TimeLogRepository : ITimeLogRepository
    {
        private readonly TimeLogDbContext _context;

        public TimeLogRepository(TimeLogDbContext context)
        {
            _context = context;
        }

        public async Task<EmployeeDashboardDetailsDto> GetEmployeeDetails(string? employeeId = null)
        {
            var activityDetails = await _context.TimeLogs
                .Where(t => t.ActivityType != null)
                .GroupBy(t => t.ActivityType)
                .Select(g => new ActivityDetails
                {
                    Name = g.Key,
                    TotalEmployeesUnderActivity = g.Select(t => t.EmployeeId).Distinct().Count()
                })
                .ToListAsync();

            var projectManagerDetails = await _context.TimeLogs
                .Where(t => t.ProjectManager != null)
                .GroupBy(t => t.ProjectManager)
                .Select(g => new ProjectManagerDetails
                {
                    Name = g.Key,
                    TotalEmployeesUnderManager = g.Select(t => t.EmployeeId).Distinct().Count()
                })
                .ToListAsync();

            var dto = new EmployeeDashboardDetailsDto
            {
                TimeLog = employeeId != null ? MapTimeLogToDto(await _context.TimeLogs.FirstOrDefaultAsync(t => t.EmployeeId == employeeId)) : null,
                EmployeeCountPerMonth = await GetEmployeeCountPerMonth(12),
                ActivityDetails = activityDetails,
                ProjectManagerDetails = projectManagerDetails
            };


            dto.AverageEfforts = await _context.TimeLogs.AverageAsync(t => t.Effort) ?? 0;
            dto.AverageTotalEfforts = await _context.TimeLogs.AverageAsync(t => t.TotalEffort) ?? 0;


            return dto;
        }//- GetEmployeeDetails









        public async Task<List<EmployeeCountPerMonthDto>> GetEmployeeCountPerMonth(int count)
        {
            var employeeCounts = await _context.TimeLogs
                .GroupBy(t => new { t.JoiningDate.Value.Year, t.JoiningDate.Value.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Count = g.Count()
                })
                .ToListAsync();
            var result = employeeCounts
                .Select(x => new EmployeeCountPerMonthDto
                {
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(x.Month),
                    Year = x.Year,
                    Count = x.Count
                })
                .OrderByDescending(x => x.Year)
                .ThenByDescending(x => x.Month)
                .Take(count)
                .ToList();
            return result;
        }

        public async Task<List<TimeLogDto>> GetTimeLogs()
        {
            var timeLogs = await _context
                .TimeLogs.AsNoTracking()
                .OrderBy(timelog => timelog.EmployeeId)
                .ToListAsync();
            var timeLogDtos = timeLogs.Select(timeLog => MapTimeLogToDto(timeLog)).ToList();
            return timeLogDtos;
        }

        public async Task<List<TimeLogDto>> SearchTimeLogs(SearchDataDto searchData)
        {
            DateTime? startDate = searchData.DateRange?.Start;
            DateTime? endDate = searchData.DateRange?.End;

            var timeLogs = await _context
                .TimeLogs.Where(timeLog =>
                    (
                        searchData.Project == null
                        || !searchData.Project.Any()
                        || searchData.Project.Contains(timeLog.ProjectName)
                    )
                    && (
                        searchData.Activity == null
                        || !searchData.Activity.Any()
                        || searchData.Activity.Contains(timeLog.ActivityType)
                    )
                    && (startDate == null || startDate <= timeLog.TimeLogDate)
                    && (endDate == null || endDate >= timeLog.TimeLogDate)
                )
                .OrderBy(timelog => timelog.EmployeeId)
                .ToListAsync();
            var timeLogDtos = timeLogs.Select(timeLog => MapTimeLogToDto(timeLog)).ToList();
            return timeLogDtos;
        }
        public TimeLogDto MapTimeLogToDto(TimeLog timeLog)
        {
            return new TimeLogDto
            {
                EmployeeId = timeLog.EmployeeId,
                EmployeeName = timeLog.EmployeeName,
                ActivityType = timeLog.ActivityType,
                ProjectName = timeLog.ProjectName,
                ProjectCode = timeLog.ProjectCode,
                CostCentre = timeLog.CostCentre,
                SvcDelCentre = timeLog.SvcDelCentre,
                ProjectType = timeLog.ProjectType,
                ProjectManager = timeLog.ProjectManager,
                ProjectDirector = timeLog.ProjectDirector,
                ProjectDeliveryLead = timeLog.ProjectDeliveryLead,
                Level1 = timeLog.Level1,
                Level2 = timeLog.Level2,
                ActivityGroup = timeLog.ActivityGroup,
                TaskType = timeLog.TaskType,
                TaskUniqueId = timeLog.TaskUniqueId,
                TaskName = timeLog.TaskName,
                Remark = timeLog.Remark,
                Period = timeLog.Period,
                TimeLogDate = timeLog.TimeLogDate,
                Effort = timeLog.Effort,
                TotalEffort = timeLog.TotalEffort,
                CreatedDate = timeLog.CreatedDate,
                UpdatedTime = timeLog.UpdatedTime,
                HomeBaseDivision = timeLog.HomeBaseDivision,
                HomeBaseCentre = timeLog.HomeBaseCentre,
                HomeBaseTeam = timeLog.HomeBaseTeam,
                ProjectBaseDivision = timeLog.ProjectBaseDivision,
                ProjectBaseCentre = timeLog.ProjectBaseCentre,
                ProjectBaseTeam = timeLog.ProjectBaseTeam,
                JoiningDate = timeLog.JoiningDate,
                LeavingDate = timeLog.LeavingDate,
                ProjectPlannedEffortsInGteledmsOnly = timeLog.ProjectPlannedEffortsInGteledmsOnly,
                AmForBidSupport = timeLog.AmForBidSupport,
                AmBusinessCentreForBidSupport = timeLog.AmBusinessCentreForBidSupport
            };
        }
    }
}
