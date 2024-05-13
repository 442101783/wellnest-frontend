import { AppointmentService } from './../appointment/appointment.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CancelConfirmationDialogComponent } from '../cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

appointments:Appointment[] = [];


constructor(private appointmentService :AppointmentService,
  private dialog: MatDialog,
private snackBar: MatSnackBar,
private router: Router
){}
  

ngOnInit(): void {
  this.appointmentService.getAppointments().subscribe(appointments => {
    this.appointments = appointments
  });

  }


  showAppointments(){

  }
  

  openEditDialog(doctorID:string,oldID: string){

    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      width: '60vw',
      height:'40vh',
      data: { doctorID: doctorID, oldID: oldID}
    });
  
  
  }


  deleteAppointmentConfirmation(appointmentID: string): void {
    const dialogRef = this.dialog.open(CancelConfirmationDialogComponent , {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.appointmentService.deleteAppointment(appointmentID).subscribe({
          next:() => {
            this.snackBar.open('Appointment canceled successfully.', 'Close',{
              duration: 5000
            })
window.location.reload();

          },

          error:() => {
            this.snackBar.open('Failed to cancel appointment.', 'Close',{
              duration: 5000
            })
          }
        });
       
      }
    });
  }
}
