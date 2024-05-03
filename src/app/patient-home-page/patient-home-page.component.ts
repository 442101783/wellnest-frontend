import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.css']
})
export class PatientHomePageComponent {
  constructor(private authService: AuthenticationService) {}

patientProfile(){
  this.authService.getPatient()
}

  logout(): void {
    this.authService.logout();
  }

}
