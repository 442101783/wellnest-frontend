import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { Router,ActivatedRoute } from '@angular/router';
import { Doctor } from '../models/doctor';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit{

appointmentForm: FormGroup = new FormGroup({});
departments:string[] = ['family','cardiology','general', 'orthopedic']
doctorName:string[]=[]

availableAppointments:Appointment[]=[]

constructor(private formBuilder:FormBuilder,
  private appointmentService:AppointmentService,
  private router: Router,
  private activatedRoute: ActivatedRoute)
  {}

avalableAppointments:Appointment[] = []
ngOnInit(): void {
this.appointmentForm = this.formBuilder.group({
department:['',Validators.required],
doctor:[''],
date:['',Validators.required],
time:['',Validators.required]

})



}


onSubmit(){
  if(this.appointmentForm.valid){

    let appointment: Appointment = this.appointmentForm.value;
    
    
    this.appointmentService.getAvailableAppoitntments(appointment.doctorID).subscribe(appointments => {
      this.availableAppointments = appointments
    });
   
  }
}

bookAppointment(appointmentID:string){

}

fetchDoctors(): void {

  
  const selectedDepartment = this.appointmentForm.get('department')?.value;
  // Call service method to fetch doctors based on the selected department
  
  this.appointmentService.getAvailableDoctors(selectedDepartment)
    .subscribe((data: Doctor[]) => {
      console.log(data);
      this.doctorName = data.map(doctor => doctor.fname); // Update the list of doctors
    });
}

}
