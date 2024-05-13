import { Component } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router
) {}


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
      this.snackBar.open('Appointment edited successfully.', 'Close', {
        duration: 5000,
        
      });

      this.availableAppointments = this.availableAppointments.filter(appointment => appointment.appointmentID !== oldID);
      window.location.reload();

    },
    error: (error) => {
      console.error('Error booking appointment:', error);
      this.snackBar.open('Failed to book appointment.' , 'Close', {
        duration: 5000
      });
    }
    });
  }
  
}

