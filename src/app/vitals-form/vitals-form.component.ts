

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-vitals-form',
  templateUrl: './vitals-form.component.html',
  styleUrls: ['./vitals-form.component.css']
})
export class VitalsFormComponent {
  bloodType: string = '';
  bloodPressure: string= '';
  temperature: string = '';
  height: number = 0;
  weight: number = 0;
  
  constructor(
    public dialogRef: MatDialogRef<VitalsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    addVitals(): void {
      const vitals = {
        bloodType: this.bloodType,
        bloodPressure: this.bloodPressure,
        temperature: this.temperature,
        height: this.height,
        weight: this.weight
      };
      // Here, you would call a service to save the vitals, using the data.phoneNumber to identify the patient
      console.log('Submitting vitals:', vitals);
      this.dialogRef.close(); // Close the dialog after submitting vitals
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  }