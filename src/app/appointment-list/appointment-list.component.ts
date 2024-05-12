import { AppointmentService } from './../appointment/appointment.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

appointments:Appointment[] = [];


constructor(private appointmentService :AppointmentService,
  private dialog: MatDialog){}
  

ngOnInit(): void {
  this.appointmentService.getAppointments().subscribe(appointments => {
    this.appointments = appointments
  });

  }


  showAppointments(){

  }
  

  openEditDialog(doctorID:string,oldID: string){

    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      width: '90vw',
      height:'85vh',
      data: { doctorID:String ,oldID:String }
    });
  
  
  }


  deleteAppointment(appointmentID: string){
    this.appointmentService.deleteAppointment(appointmentID).subscribe({
      next: () => console.log('Appointment deleted successfully'),
      error: (error) => console.error('Error deleting appointment:', error)
    });

  }
}
