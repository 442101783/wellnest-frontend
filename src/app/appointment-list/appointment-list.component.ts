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


constructor(private appointmentservice :AppointmentService){}
  

ngOnInit(): void {
  this.appointmentservice.getAppointments().subscribe(appointments => {
    this.appointments = appointments
  });

  }


  deleteAppointment(id: string){

    this.appointmentservice.deleteAppointment(id).subscribe( () => {
      console.log("delete request")
    })

  }
}
