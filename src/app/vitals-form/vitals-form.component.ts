import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-vitals-form',
  templateUrl: './vitals-form.component.html',
  styleUrls: ['./vitals-form.component.css']
})
export class VitalsFormComponent {
  
  bloodType: string = '';
  bloodPressure: string = '';
  temperature: string = '';
  height: number = 0;
  weight: number = 0;
  bloodTypes: string[] = ['A+', 'A-' , 'B+', 'B-' , 'AB+', 'AB-' , 'O+', 'O-',]; 
  phoneNumber:string ='';

  vitalForm: FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<VitalsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private vitalService: AppointmentService 
  ) {
    
    this.vitalForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      bloodType: ['', Validators.required],
      bloodPressure: ['', [Validators.required, this.validateBloodPressure]],
      temperature: ['', [Validators.required, Validators.min(20), Validators.max(45)]], // reasonable human body temperature range in Celsius
      height: [null, [Validators.required, Validators.min(0.5), Validators.max(2.5)]], // height in meters
      weight: [null, [Validators.required, Validators.min(5), Validators.max(300)]] // weight in kilograms
    });
    
  }

  addVitals(): void {
    
    if (this.vitalForm.valid) {
      this.vitalService.addVitals(this.vitalForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error submitting vitals:', err);
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  
  
  validateBloodPressure(control: AbstractControl) {
    const bloodPressurePattern = /^\d{1,3}\/\d{1,3}$/; // Example pattern: 120/80
    if (!bloodPressurePattern.test(control.value)) {
      return { invalidBloodPressure: true };
    }
    return null;
  }
}
