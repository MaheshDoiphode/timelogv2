import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TimeLog } from '../models/TimeLog';
import { SearchData } from '../models/SearchData';
import { TableComponent } from '../table/table.component';
import { Menu, MenuItem } from '../models/Menu';
import { EmployeeCountPerMonth } from '../models/EmployeeCountPerMonth';
import { EmployeeDashboardDetails } from '../models/EmployeeDashboardDetails';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TimelogService {
  constructor(private http: HttpClient) { this.setTimeLogs(); }
  private serverUrl = environment.serverUrl;
  public timeLogs = new BehaviorSubject<TimeLog[]>([]);
  timeLogs$ = this.timeLogs.asObservable();

  public projectmenu = new BehaviorSubject<MenuItem[]>([]);
  public activitymenu = new BehaviorSubject<MenuItem[]>([]);

  private employeeDashboardDetailsSource = new BehaviorSubject<EmployeeDashboardDetails | null>(null);
  employeeDashboardDetails$ = this.employeeDashboardDetailsSource.asObservable();

  // new method to get the employeecount from the server
  getEmployeeDashboardDetails(employeeId?: string): Observable<EmployeeDashboardDetails> {
    let url = `${this.serverUrl}/Timelog/user`;
    if (employeeId) {
      url += `/${employeeId}`;
    }
    return this.http.get<EmployeeDashboardDetails>(url).pipe(
      tap(data => {
        console.log('employeeDashboardDetails', data);
        this.employeeDashboardDetailsSource.next(data);
      })
    );
  }


  //@Deprecated
  getEmployeeCountPerMonth(count: number = 12): Observable<EmployeeCountPerMonth[]> {
    return this.http.get<EmployeeCountPerMonth[]>(`${this.serverUrl}/TimeLog/employee-count-per-month/${count}`);
  }



  getTimeLogs(): BehaviorSubject<TimeLog[]> {
    return this.timeLogs;
  }

  setTimeLogs = () => {
    this.http.get<TimeLog[]>(`${this.serverUrl}/TimeLog/all`).subscribe(data => {
      this.timeLogs.next(data);

      // Extract unique project names and activity types
      const uniqueProjects = [...new Set(data.map(item => item.projectName))].filter(Boolean);
      const uniqueActivities = [...new Set(data.map(item => item.activityType))].filter(Boolean);

      // Create menu items for projects
      const projectMenuItems: MenuItem[] = uniqueProjects.map(project => {
        const manager = data.find(item => item.projectName === project)?.projectManager ?? '';
        return { value: project ?? '', text: manager, checked: false };
      });
      this.projectmenu.next(projectMenuItems);


      // Create menu items for activities
      const activityMenuItems: MenuItem[] = uniqueActivities.map(activity => {
        return { value: activity ?? '', text: activity ?? '', checked: false };
      });
      this.activitymenu.next(activityMenuItems);
    });
  }
  filterData(searchData: SearchData) {
    this.http.post<TimeLog[]>(`${this.serverUrl}/TimeLog/activityfilter`, searchData).subscribe(data => {
      this.timeLogs.next(data);
      console.log(this.timeLogs.value);
    });
  }
}
