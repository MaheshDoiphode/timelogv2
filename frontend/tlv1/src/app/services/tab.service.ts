// tab.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private selectedTab = new BehaviorSubject<string>('employee');

  setSelectedTab(tab: string) {
    this.selectedTab.next(tab);
  }

  getSelectedTab() {
    return this.selectedTab.asObservable();
  }
}