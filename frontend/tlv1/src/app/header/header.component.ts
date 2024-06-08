import { Component } from '@angular/core';
import {TabService} from '../services/tab.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedTab : string = 'employee';
  isMenuOpen: boolean = false;

  constructor(private tabService: TabService) {
    this.tabService.getSelectedTab().subscribe(tab => this.selectedTab = tab);
  }

  selectTab(tabName: string) {
    this.tabService.setSelectedTab(tabName);
    this.selectedTab = tabName;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
