import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Patient } from '../models/patient';
import { Vitals } from '../models/vitals';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit{



  patient!: Patient;
  prescriptions: Prescription[] = [];
  diagnosis: Diagnosis[] = [];
  vitals: Vitals[] = [];


     constructor(
      private dialogRef: MatDialogRef<ProfileDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { patientID: string },
      private patientService: AppointmentService    ){}



      ngOnInit(): void {
        if (this.data.patientID) {
            this.patientService.getPrescriptions(this.data.patientID).subscribe(prescriptions => {
                this.prescriptions = prescriptions;
            });
    
            this.patientService.getDiagnosis(this.data.patientID).subscribe(diagnosis => {
                this.diagnosis = diagnosis;
            });

            this.patientService.getPatient(this.data.patientID).subscribe({
              next: (patient) => this.patient = patient,
              error: (error) => console.error('Failed to fetch patient', error)
            });

            this.patientService.getVitals(this.data.patientID).subscribe({
              next: (vitals) => this.vitals = vitals,
              error: (error) => console.error('Failed to fetch vitals', error)
        
            });
        }
    }

 

}
