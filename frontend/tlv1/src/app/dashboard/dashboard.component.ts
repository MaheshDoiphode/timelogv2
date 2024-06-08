import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { TimelogService } from '../services/timelog.service';
import { EmployeeCountPerMonth } from '../models/EmployeeCountPerMonth';
import { HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDashboardDetails } from '../models/EmployeeDashboardDetails';
import { ChartSkeletonComponent } from '../skeletons/chart/chart-skeleton/chart-skeleton.component';
import { TimeLog } from '../models/TimeLog';
import { InfoSkeletonComponent } from '../skeletons/info-skeleton/info-skeleton.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [CommonModule, FormsModule, BaseChartDirective, HeaderComponent, ChartSkeletonComponent, InfoSkeletonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private timeLogService: TimelogService, private route: ActivatedRoute) { }
  labels: string[] = [];
  data: number[] = [];
  showModal: boolean = false;
  activityDetailsLabels: string[] = [];
  activityDetailsData: number[] = [];
  projectManagerDetailsLabels: string[] = [];
  projectManagerDetailsData: number[] = [];
  selectedChart: 'line' | 'doughnut' | 'polarArea' = 'line';
  isLoading: boolean = true;
  timelog: TimeLog | undefined;
  selectedGroup: string = 'Employee Details';
  groups = ['Employee Details', 'Project Details', 'Project Location Information', 'Task Information', 'Support Information'];
  isDropdownOpen = false;
  isGroupLoading: boolean = true;
  averageEfforts: number = 0;
  averageTotalEfforts: number = 0;
  empEfforts : number = 0;
  empTotalEfforts : number = 0;



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const employeeId = params['id'];
      this.timeLogService.getEmployeeDashboardDetails(employeeId).subscribe((details: EmployeeDashboardDetails) => {
        const employeeCounts = details.employeeCountPerMonth || [];
        this.labels = employeeCounts.map(e => `${e.month}-${e.year}`);
        this.data = employeeCounts.map(e => e.count);
        const activityDetails = details.activityDetails || [];
        this.activityDetailsLabels = activityDetails.map(a => a.name || '');
        this.activityDetailsData = activityDetails.map(a => a.totalEmployeesUnderActivity);
        this.timelog = details.timeLog;
        this.averageEfforts = details.averageEfforts;
        this.averageTotalEfforts = details.averageTotalEfforts;
        this.empEfforts = details.timeLog?.effort || 0;
        this.empTotalEfforts = details.timeLog?.totalEffort || 0;

        this.updateConfigForlineChart();
        this.updateConfigForDoughnutChart();
        this.updateConfigForPolarAreaChart(details);
        this.isLoading = false;
        this.isGroupLoading = false;
      });
    });
  }



  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Polar Chart to display the employee counts under each project manager
  polarAreaChartConfig: any = {
    type: 'polarArea',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: []
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(0, 0, 0, 1)' // black text with 70% opacity
          }
        },
        title: {
          display: true,
          text: 'Project Manager Details',
          color: 'rgba(0, 0, 0, 1)' // black text with 70% opacity
        }
      }
    }
  };

  updateConfigForPolarAreaChart(details: EmployeeDashboardDetails): void {
    const projectManagerDetails = details.projectManagerDetails || [];
    const colors = this.generateColors(projectManagerDetails.length);
    this.polarAreaChartConfig = {
      ...this.polarAreaChartConfig,
      data: {
        labels: projectManagerDetails.map(d => d.name),
        datasets: [{
          data: projectManagerDetails.map(d => d.totalEmployeesUnderManager),
          backgroundColor: colors
        }]
      }
    };
  }





  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showModal) {
      this.closeModal();
    }
    this.isDropdownOpen = false;
  }

  openModal(chartType: 'line' | 'doughnut' | 'polarArea'): void {
    this.selectedChart = chartType;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  generateColors(numColors: number): string[] {
    const colors: string[] = [];
    const start = Math.random() * 360;
    for (let i = 0; i < numColors; i++) {
      colors.push(`hsl(${(start + i / numColors * 360) % 360}, 100%, 75%, 0.5)`);
    }
    return colors;
  }

  // Doughnut chart to display the employee counts under each activity
  doughnutChartConfig: any = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Activity Details'
        }
      }
    }
  };

  updateConfigForDoughnutChart(): void {
    const colors = this.generateColors(this.activityDetailsLabels.length);
    this.doughnutChartConfig = {
      ...this.doughnutChartConfig,
      data: {
        ...this.doughnutChartConfig.data,
        labels: [...this.activityDetailsLabels],
        datasets: [{
          ...this.doughnutChartConfig.data.datasets[0],
          data: [...this.activityDetailsData],
          backgroundColor: colors
        }]
      }
    };
  }





  updateConfigForlineChart(): void {
    this.config = {
      ...this.config,
      data: {
        ...this.config.data,
        labels: [...this.labels],
        datasets: [{
          ...this.config.data.datasets[0],
          data: [...this.data]
        }]
      }
    };
  }
  genericOptions = {
    fill: false,
    interaction: {
      intersect: false
    },
    radius: 0,
  };
  skipped = (ctx: any, value: any) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
  down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

  config = {
    type: 'line',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Employee Count Per Month',
        data: this.data,
        borderColor: 'rgb(75, 192, 192)',
        segment: {
          borderColor: (ctx: any) => this.skipped(ctx, 'rgb(0,0,0,0.2)') || this.down(ctx, 'rgb(192,75,75)'),
          borderDash: (ctx: any) => this.skipped(ctx, [6, 6]),
        },
        spanGaps: true
      }]
    },
    options: this.genericOptions
  };
}