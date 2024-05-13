import { Component } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})


export class ReviewDialogComponent {

  availableAppointments: Appointment[] = [];

  constructor(
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientID: string },
    private appointmentService: AppointmentService,
  private snackBar: MatSnackBar
  ) {}


    ngOnInit(): void {
      if (this.data.patientID) {

      this.appointmentService.getAvailableAppointments(this.data.patientID)
        .subscribe((appointments: Appointment[]) => {
          this.availableAppointments = appointments;
        });


      }}
  bookAppointment(patientID:string, appointmentID: string): void {
    this.appointmentService.addAppointment(patientID, appointmentID).subscribe({      next: () => {
      this.snackBar.open('Appointment booked successfully!', 'Close',{
        duration: 5000
      });
      this.availableAppointments = this.availableAppointments.filter(appointment => appointment.appointmentID !== appointmentID);
    },
    error: (error) => {
      console.error('Error booking appointment:', error);
      this.snackBar.open('Failed to book appointment.', 'Close',{
        duration: 5000
      });
    }
    });
  }
  

}
