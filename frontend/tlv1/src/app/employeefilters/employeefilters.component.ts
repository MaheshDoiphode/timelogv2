import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TimeLog } from '../models/TimeLog';
import { TimelogService } from '../services/timelog.service';
import { first, map, startWith, take } from 'rxjs';
import { SearchData } from '../models/SearchData';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-employeefilters',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatDatepickerModule, JsonPipe, CommonModule, DatePipe, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './employeefilters.component.html',
  styleUrl: './employeefilters.component.css'
})
export class EmployeefiltersComponent implements OnInit {
  @Output() onSearch: EventEmitter<TimeLog[]> = new EventEmitter();

  constructor(private timelogService: TimelogService, private datePipe: DatePipe) { }
  projectmenu = {
    id: 'projectmenu',
    name: 'PROJECT NAME',
    state: false,
    items: [] as { value: string, text: string, checked: boolean }[],
    checkedItems: []
  };

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.projectmenu.state) {
      this.projectmenu.state = false;
    }
  }


  ngOnInit() {
    this.timelogService.projectmenu.subscribe(menuItems => {
      this.projectmenu.items = menuItems;
    });
  }

  search() {
    const searchData = new SearchData(
      this.projectmenu.checkedItems,
      [],
      {
        start: this.range.get('start')?.value ?? null,
        end: this.range.get('end')?.value ?? null
      }
    );
    console.log(searchData);
    this.timelogService.filterData(searchData);
  }


  toggleMenu(menu: any) {
    if (menu.id === 'projectmenu') {
      this.projectmenu.state = !this.projectmenu.state;
    }
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onCheckboxChange(e: any, item: any, menu: any) {
    item.checked = e.target.checked;
    if (e.target.checked) {
      if (!menu.checkedItems.includes(item.value)) {
        menu.checkedItems.push(item.value);
      }
    } else {
      const index = menu.checkedItems.indexOf(item.value);
      if (index !== -1) {
        menu.checkedItems.splice(index, 1);
      }
    }
    // console.log(menu.id + menu.checkedItems);
  }

 

}




