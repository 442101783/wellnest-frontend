import { Component } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.css']
})
export class EditAppointmentDialogComponent {










  availableAppointments: Appointment[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {doctorID:string, oldID:string},
    private appointmentService: AppointmentService) {}


    ngOnInit(): void {
      if (this.data.doctorID) {
console.log(this.data.doctorID)
      this.appointmentService.getAvailableAppointments(this.data.doctorID)
        .subscribe((appointments: Appointment[]) => {
          this.availableAppointments = appointments;
        });


      }}
  editAppointment(oldID:string, newID: string): void {
    this.appointmentService.editAppointment(oldID, newID).subscribe({      next: () => {
      alert('Appointment booked successfully!');
      this.availableAppointments = this.availableAppointments.filter(appointment => appointment.appointmentID !== oldID);
    },
    error: (error) => {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment.');
    }
    });
  }
  
}

