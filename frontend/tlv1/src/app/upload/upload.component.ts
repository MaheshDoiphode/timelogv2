import { Component } from '@angular/core';
import { FileService } from '../services/file.service';
import * as XLSX from 'xlsx';
import { TempComponent } from '../temp/temp.component';
import {TableComponent} from '../table/table.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [HeaderComponent, TempComponent, TableComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  file!: File;
  fileService: FileService;
  fileName : string = 'yourfile.xlsx';
  fileSize : string = '0 KB';
  fileType : string = '';
  sheetCount: number = 0; 

  constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      this.fileService.setFile(file);
      this.fileName = file.name;
      this.fileSize = (file.size/1024).toFixed(2) +  " KB";
      const fileType = file.type;
      if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.fileType = 'Excel';
      } else if (fileType === 'application/pdf') {
        this.fileType = 'PDF';
      } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.fileType = 'Word';
      } else {
        this.fileType = '';
      }
    }
  }//- onFileChange

  readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array((e.target as FileReader).result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      this.sheetCount = workbook.SheetNames.length; 
    };
    reader.readAsArrayBuffer(file);
  }
}
