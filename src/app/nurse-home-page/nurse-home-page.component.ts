import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { VitalsFormComponent } from '../vitals-form/vitals-form.component';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-nurse-home-page',
  templateUrl: './nurse-home-page.component.html',
  styleUrls: ['./nurse-home-page.component.css']
})
export class NurseHomePageComponent {

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private nurseService: AppointmentService
  ) {}

  openDialog(patientPhoneNumber: string): void {
    this.nurseService.getPatientName(patientPhoneNumber).subscribe({
      next: (response) => {
        if (response && response.name) {
          const dialogRef = this.dialog.open(VitalsFormComponent, {
            width: '800px',
            data: {phoneNumber: patientPhoneNumber, patientName: response.name, bloodType: response.bloodType, date: response.date }
          });

          dialogRef.afterClosed().subscribe(result => {
          });
        } else {
          console.error('Patient name not found for phone number:', patientPhoneNumber);
        }
      },
      error: (err) => {
        alert("invalid number")
        console.error('Error retrieving patient name:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
