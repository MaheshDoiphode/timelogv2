import { Component, ViewChild, ElementRef, NgModule, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileService } from '../services/file.service';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelogService } from '../services/timelog.service';
import { TimeLog } from '../models/TimeLog';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [FileService]
})
export class TableComponent implements OnInit{
  data: TimeLog[] = [];
  filteredData: TimeLog[] = [];
  displayData: TimeLog[] = [];
  pageSize = 10;
  page = 1;
  searchTerm = '';
  visiblePages = [1, 2, 3, 4, 5];
  headers: string[] = [];
  selectedColumns: string[] = [];

  constructor(private timelogService: TimelogService) { }

  ngOnInit() {
    this.subscribeData();
  }

  // ngAfterViewInit(): void {
  //   this.subscribeData();
  // }
  

  subscribeData(){
    this.timelogService.getTimeLogs().subscribe(data => {
      this.data = data;
      this.filteredData = data;
      if (this.data[0]) {
        this.headers = Object.keys(this.data[0]) as (keyof TimeLog)[];
        this.selectedColumns = [...this.headers];
      }
      this.updateVisiblePages();
      this.updateDisplayData();
    });
  }
  getValue(row: TimeLog, header: string): any {
    return row[header as keyof TimeLog];
  }

  onPageChange(page: number) {
    this.page = page;
    this.updateVisiblePages();
    this.updateDisplayData();
  }

  updateVisiblePages() {
    const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    let startPage = this.page - 2;
    let endPage = this.page + 2;

    if (startPage < 1) {
      endPage -= (startPage - 1);
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= (endPage - totalPages);
      endPage = totalPages;
    }

    startPage = Math.max(startPage, 1);

    this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  updateDisplayData() {
    const start = (this.page - 1) * this.pageSize;
    const end = Math.min(this.page * this.pageSize, this.filteredData.length);
    this.displayData = this.filteredData.slice(start, end);
  }
  search() {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(item =>
        Object.values(item).some(val =>
          val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.filteredData = this.data;
    }
    this.updateDisplayData();
  }

  toggleColumn(header: string) {
    if (header === 'all') {
      if (this.selectedColumns.length === this.headers.length) {
        this.selectedColumns = [];
      } else {
        this.selectedColumns = [...this.headers];
      }
    } else {
      const index = this.selectedColumns.indexOf(header);
      if (index > -1) {
        this.selectedColumns.splice(index, 1);
      } else {
        this.selectedColumns.push(header);
      }
    }
    console.log(this.selectedColumns);
  }

  isSelected(header: string) {
    return this.selectedColumns.includes(header);
  }


  exportToExcel() {
    const exportData = this.filteredData.map((item: { [key: string]: any }) => {
      const row: { [key: string]: any } = {};
      this.selectedColumns.forEach(column => {
        row[column] = item[column];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'export.xlsx');
  }

  generateReport() {

  }










  ceil(value: number) {
    return Math.ceil(value);
  }

  min(a: number, b: number) {
    return Math.min(a, b);
  }
}