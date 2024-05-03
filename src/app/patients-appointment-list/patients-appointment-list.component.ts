import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-patients-appointment-list',
  templateUrl: './patients-appointment-list.component.html',
  styleUrls: ['./patients-appointment-list.component.css']
})
export class PatientsAppointmentListComponent {

    patientAppointments:Appointment[] = [];
    
    
    constructor(private appointmentservice :AppointmentService){}
      
    
    ngOnInit(): void {
      this.appointmentservice.getAppointments().subscribe(patientAppointments => {
        this.patientAppointments = patientAppointments
      });
  
}
}