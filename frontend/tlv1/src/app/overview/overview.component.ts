import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { HeaderComponent } from '../header/header.component';
import { TempComponent } from '../temp/temp.component';
import { EmployeefiltersComponent } from '../employeefilters/employeefilters.component';
import { ActivityfiltersComponent } from '../activityfilters/activityfilters.component';
import {TabService} from '../services/tab.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TableComponent, HeaderComponent, TempComponent, EmployeefiltersComponent, ActivityfiltersComponent, CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})


export class OverviewComponent {

  selectedTab: string = 'employee';

  constructor(private tabService: TabService) {
    this.tabService.getSelectedTab().subscribe(tab => this.selectedTab = tab);
  }

 
}



