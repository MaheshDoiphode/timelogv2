using Microsoft.EntityFrameworkCore;
using timelogcore.Models;

namespace timelogcore.Data
{
    public class TimeLogDbContext : DbContext
    {
        public TimeLogDbContext(DbContextOptions<TimeLogDbContext> options) : base(options)
        {
            TimeLogs = Set<TimeLog>();
        }

        public DbSet<TimeLog> TimeLogs { get; set; }
    

    }
}