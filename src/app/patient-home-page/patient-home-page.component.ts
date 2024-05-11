import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment/appointment.service';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.css']
})
export class PatientHomePageComponent {

  patient!: Patient;

  constructor(private patientService: AppointmentService, private authService: AuthenticationService) {}


  logout(): void {
    this.authService.logout();
  }


getPatient(patientID: string): void {
  this.patientService.getPatient(patientID).subscribe({
    next: (patient) => this.patient = patient,
    error: (error) => console.error('Failed to fetch patient', error)
  });
}
}