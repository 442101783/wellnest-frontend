import { AppointmentService } from './../appointment/appointment.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

appointments:Appointment[] = [];


constructor(private appointmentService :AppointmentService){}
  

ngOnInit(): void {
  this.appointmentService.getAppointments().subscribe(appointments => {
    this.appointments = appointments
  });

  }

  editAppointment(doctorID:string, oldID:string){

    


  }

  deleteAppointment(appointmentID: string){
    this.appointmentService.deleteAppointment(appointmentID).subscribe({
      next: () => console.log('Appointment deleted successfully'),
      error: (error) => console.error('Error deleting appointment:', error)
    });

  }
}
