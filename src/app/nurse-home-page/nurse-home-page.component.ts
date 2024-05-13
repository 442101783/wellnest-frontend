import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { VitalsFormComponent } from '../vitals-form/vitals-form.component';
import { AppointmentService } from '../appointment/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nurse-home-page',
  templateUrl: './nurse-home-page.component.html',
  styleUrls: ['./nurse-home-page.component.css']
})
export class NurseHomePageComponent {

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private nurseService: AppointmentService,
    private snackBar: MatSnackBar
  ) {}

  validatePhoneNumber(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (!allowedKeys.includes(event.key) && !(/\d/.test(event.key))) {
      event.preventDefault();
    }
  }
  
  formatPhoneNumber(inputElement: HTMLInputElement): void {
    let value = inputElement.value;
    if (value && !value.startsWith('05')) {
      value = '05' + value.slice(2);
    }
    inputElement.value = value.slice(0, 10);
  }
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
        console.error('Error retrieving patient name:', err);
        this.snackBar.open('Invalid phone number.', 'Close', {
          duration: 5000
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
