export class SearchData {
    project: string[];
    activity: string[];
    dateRange: { start: Date | null, end: Date | null };
  
    constructor(project: string[], activity: string[], dateRange: { start: Date | null, end: Date | null }) {
      this.project = project;
      this.activity = activity;
      this.dateRange = dateRange;
    }
  }