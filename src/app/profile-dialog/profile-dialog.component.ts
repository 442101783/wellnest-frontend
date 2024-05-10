import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit{
  
  ngOnInit(): void {
    if (this.data.patientID) {
        this.patientService.getPrescriptions(this.data.patientID).subscribe(prescriptions => {
            this.prescriptions = prescriptions;
        });

        this.patientService.getDiagnosis(this.data.patientID).subscribe(diagnoses => {
            this.diagnoses = diagnoses;
        });
    }
}
  activeTab = 'diagnosis';

  prescriptions: Prescription[] = [];
    diagnoses: Diagnosis[] = [];

     constructor(
      private dialogRef: MatDialogRef<ProfileDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { patientID: string },
      private patientService: AppointmentService    ){}

      
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
 

}
