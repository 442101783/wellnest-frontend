import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppointmentModule } from '../appointment/appointment.module';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.css']
})
export class PatientHomePageComponent {
  constructor(private authService: AuthenticationService) {}


  logout(): void {
    this.authService.logout();
  }

}
