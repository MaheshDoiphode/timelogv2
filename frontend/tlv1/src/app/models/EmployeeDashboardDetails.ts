import { EmployeeCountPerMonth } from "./EmployeeCountPerMonth";
import { TimeLog } from "./TimeLog";

export interface EmployeeDashboardDetails {
    timeLog?: TimeLog;
    averageEfforts: number;
    averageTotalEfforts: number;
    employeeCountPerMonth?: EmployeeCountPerMonth[];
    activityDetails?: ActivityDetails[];
    projectManagerDetails?: ProjectManagerDetails[];
}

export interface ActivityDetails {
    name?: string;
    totalEmployeesUnderActivity: number;
}

export interface ProjectManagerDetails {
    name?: string;
    totalEmployeesUnderManager: number;
}