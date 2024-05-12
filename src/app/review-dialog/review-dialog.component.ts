import { Component } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';


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
    private appointmentService: AppointmentService) {}


    ngOnInit(): void {
      if (this.data.patientID) {

      this.appointmentService.getAvailableAppointments(this.data.patientID)
        .subscribe((appointments: Appointment[]) => {
          this.availableAppointments = appointments;
        });


      }}
  bookAppointment(patientID:string, appointmentID: string): void {
    this.appointmentService.addAppointment(patientID, appointmentID).subscribe({      next: () => {
      alert('Appointment booked successfully!');
      this.availableAppointments = this.availableAppointments.filter(appointment => appointment.appointmentID !== appointmentID);
    },
    error: (error) => {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment.');
    }
    });
  }
  

}
