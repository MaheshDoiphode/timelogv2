import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { TempComponent } from './temp/temp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { OverviewComponent } from './overview/overview.component';
import { ActivityfiltersComponent } from './activityfilters/activityfilters.component';
import { EmployeefiltersComponent } from './employeefilters/employeefilters.component';
import { ChartSkeletonComponent } from './skeletons/chart/chart-skeleton/chart-skeleton.component';
import { InfoSkeletonComponent } from './skeletons/info-skeleton/info-skeleton.component';
export const routes: Routes = [
    {path: 'info-skeleton', component: InfoSkeletonComponent},
    {path: 'chart-skeleton', component: ChartSkeletonComponent},
    {path: 'temp', component: TempComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'table', component: TableComponent},
    {path: 'dashboard/:id', component: DashboardComponent},
    {path: 'overview', component: OverviewComponent},
    {path: 'activity', component: ActivityfiltersComponent},
    {path: 'employee', component: EmployeefiltersComponent},
    {path: '', component: SigninComponent}
    
];
