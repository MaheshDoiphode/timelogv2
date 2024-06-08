import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { TimelogService } from '../services/timelog.service';
import { EmployeeCountPerMonth } from '../models/EmployeeCountPerMonth';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-temp',
  standalone: true,
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css'
})
export class TempComponent implements OnInit {
  constructor(private timeLogService: TimelogService) { }
  labels: string[] = [];
  data: number[] = [];
  showModal: boolean = false;

  ngOnInit(): void {
    this.timeLogService.getEmployeeCountPerMonth().subscribe((employeeCounts: EmployeeCountPerMonth[]) => {
      this.labels = employeeCounts.map(e => `${e.month}-${e.year}`);
      this.data = employeeCounts.map(e => e.count);
      this.updateConfig();
    });
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showModal) {
      this.closeModal();
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  updateConfig(): void {
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