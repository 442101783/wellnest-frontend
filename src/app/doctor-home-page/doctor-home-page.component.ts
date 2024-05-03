import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.component.html',
  styleUrls: ['./doctor-home-page.component.css']
})
export class DoctorHomePageComponent {

  constructor(private authService: AuthenticationService) {}
  
  logout(): void {
    this.authService.logout();
  }
}
