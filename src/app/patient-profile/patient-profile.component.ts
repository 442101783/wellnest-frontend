import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
import { Patient } from '../models/patient';
import { Vitals } from '../models/vitals';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  
  activeTab = 'medications';
  

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  patient!: Patient;
  prescriptions:Prescription[] = [];
  diagnosis: Diagnosis[] = [];
  vitals: Vitals[] = [];
  latestBloodType: string = ''; 

  constructor(private patientService: AppointmentService){}
  ngOnInit(): void {
    this.patientService.getPrescriptions('').subscribe(presciptions => {
      this.prescriptions = presciptions
      
    });
    this.patientService.getDiagnosis('').subscribe(diagnosis => {
      this.diagnosis = diagnosis
      
    });
  

    this.patientService.getPatient("").subscribe(patient => {
      this.patient = patient
    });

    this.patientService.getVitals("").subscribe({
      next: (vitals) => {
        
        this.vitals = vitals
        if (vitals.length > 0) {
          this.latestBloodType = vitals[vitals.length - 1].bloodType;
        }
      },
      error: (error) => console.error('Failed to fetch vitals', error)

    });
  }

  getPatient(patientID: string): void {
    this.patientService.getPatient(patientID).subscribe({
      next: (patient) => this.patient = patient,
      error: (error) => console.error('Failed to fetch patient', error)
    });
  }
}
