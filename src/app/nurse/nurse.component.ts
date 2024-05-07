import { AppointmentService } from './../appointment/appointment.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {
constructor(nurseService:AppointmentService){}

phoneNumSubmit(){
  
}
}
