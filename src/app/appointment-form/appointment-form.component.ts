import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit{

appointmentForm: FormGroup = new FormGroup({});

constructor(private formBuilder:FormBuilder,
  private appointmentService:AppointmentService,
  private router: Router,
  private activatedRoute: ActivatedRoute)
  {}


ngOnInit(): void {
this.appointmentForm = this.formBuilder.group({
department:['',Validators.required],
date:['',Validators.required],
time:['',Validators.required]

})

let appointmentID = this.activatedRoute.snapshot.paramMap.get('id')

if(appointmentID){
  let appoitnment = this.appointmentService.getAppointment(appointmentID)

  if(appoitnment){
    this.appointmentForm.patchValue(appoitnment)
  }
}


}


onSubmit(){
  if(this.appointmentForm.valid){

    let appointment: Appointment = this.appointmentForm.value;
    let apointmentID = this.activatedRoute.snapshot.paramMap.get('id')
    appointment.patientID = "1"
    appointment.doctorID = '1'
    appointment.id = Date.now().toString()


    if(apointmentID){
      //edit
      this.appointmentService.editAppointment(apointmentID,appointment).subscribe(() => {
        console.log("edit request")
      })
    } else {
      //create
      this.appointmentService.addAppointment(appointment).subscribe(() => {
        console.log("create request")
      })
    }


    this.router.navigate(['/list'])
    
   
  }
}
}
