import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  
  prescriptions:Prescription[] = []
  diagnosis: Diagnosis[] = [];
  constructor(private patientService: AppointmentService){

  }
  ngOnInit(): void {
    this.patientService.getPrescriptions().subscribe(presciptions => {
      this.prescriptions = presciptions

    });
    this.patientService.getDiagnosis().subscribe(presciptions => {
      this.diagnosis = presciptions
      
    });
  

  }

}
