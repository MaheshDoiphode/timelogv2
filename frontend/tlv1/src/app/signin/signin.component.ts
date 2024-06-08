import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private router: Router){
    
  }


}
