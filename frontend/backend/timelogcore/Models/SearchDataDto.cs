namespace timelogcore.Models
{
    public class SearchDataDto
    {
        public List<string>? Project { get; set; }
        public List<string>? Activity { get; set; }
        public DateRangeDto? DateRange { get; set; }

        public void ConvertDatesToUtc()
        {
            if (DateRange.Start.HasValue)
            {
                DateRange.Start = DateTime.SpecifyKind(DateRange.Start.Value, DateTimeKind.Utc);
            }
            if (DateRange.End.HasValue)
            {
                DateRange.End = DateTime.SpecifyKind(DateRange.End.Value, DateTimeKind.Utc);
            }
        }
    }
}
