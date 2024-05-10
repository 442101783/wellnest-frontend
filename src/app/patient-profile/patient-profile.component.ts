import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  
  activeTab = 'diagnosis';  // Default to diagnosis

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  patient!: Patient;
  prescriptions:Prescription[] = []
  diagnosis: Diagnosis[] = [];

  constructor(private patientService: AppointmentService){

  }
  ngOnInit(): void {
    this.patientService.getPrescriptions('').subscribe(presciptions => {
      this.prescriptions = presciptions
      
    });
    this.patientService.getDiagnosis('').subscribe(presciptions => {
      this.diagnosis = presciptions
      
    });
  

    this.patientService.getPatient("").subscribe(patient => {
      this.patient = patient
    })
  }

  getPatient(patientID: string): void {
    this.patientService.getPatient(patientID).subscribe({
      next: (patient) => this.patient = patient,
      error: (error) => console.error('Failed to fetch patient', error)
    });
  }
}
