import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SearchData } from '../models/SearchData';
import { map, take } from 'rxjs/operators';
import { TimelogService } from '../services/timelog.service';
import { TimeLog } from '../models/TimeLog';
import { Menu, MenuItem } from '../models/Menu';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-activityfilters',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatDatepickerModule, JsonPipe, CommonModule, FormsModule, DatePipe, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './activityfilters.component.html',
  styleUrl: './activityfilters.component.css'
})
export class ActivityfiltersComponent implements OnInit {

  constructor(private timelogService: TimelogService, private datePipe: DatePipe) { }
  projectmenu: Menu = {
    id: 'projectmenu',
    name: 'PROJECT NAME',
    state: false,
    items: [] as { value: string, text: string, checked: boolean }[],
    checkedItems: []
  };

  activitymenu: Menu = {
    id: 'activitymenu',
    name: 'ACTIVITY TYPE',
    state: false,
    items: [] as { value: string, text: string, checked: boolean }[],
    checkedItems: []
  };

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.projectmenu.state || this.activitymenu.state) {
      this.projectmenu.state = false;
      this.activitymenu.state = false;
    }
  }

  @Output() onSearch: EventEmitter<TimeLog[]> = new EventEmitter();

  ngOnInit() {
    this.timelogService.projectmenu.subscribe(menuItems => {
      this.projectmenu.items = menuItems;
    });
  
    this.timelogService.activitymenu.subscribe(menuItems => {
      this.activitymenu.items = menuItems;
    });

    this.range.valueChanges.subscribe(val => {
      this.datePipe.transform(val.start, 'dd/MM/yyyy');
      this.datePipe.transform(val.end, 'dd/MM/yyyy');
      //console.log(`Start date: ${startDate}, End date: ${endDate}`);
    });
  }

  search() {
    const searchData = new SearchData(
      this.projectmenu.checkedItems ?? [],
      this.activitymenu.checkedItems ?? [],
      {
        start: this.range.get('start')?.value ?? null,
        end: this.range.get('end')?.value ?? null
      }
    );
    //console.log(searchData);
    this.timelogService.filterData(searchData);
  }

  toggleMenu(menu: any) {
    if (menu.id === 'projectmenu') {
      this.activitymenu.state = false;
    } else if (menu.id === 'activitymenu') {
      this.projectmenu.state = false;
    }
    menu.state = !menu.state;
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
    console.log(menu.id + menu.checkedItems);
  }



}



