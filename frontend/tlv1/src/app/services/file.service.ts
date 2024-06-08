import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() {
    this.file = null;
  }
  private file: File | null;

  private fileSubject = new Subject<File>();
  file$ = this.fileSubject.asObservable();
  
  setFile(file: File) {
    this.fileSubject.next(file);
  }

  getFile(): File | null {
    console.log(this.file);
    return this.file;
  }

  async readExcel(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array((e.target as any).result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(jsonData);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
