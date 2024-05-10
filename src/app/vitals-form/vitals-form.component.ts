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
      PhoneNumber: ['', Validators.required], 
      bloodType: ['', Validators.required], 
      bloodPressure: ['', [Validators.required,this.validateBloodPressure,Validators.minLength(5),Validators.maxLength(7)]],
      temperature: ['', Validators.required],
      height: [0, [Validators.required,Validators.maxLength(3)]],
      weight: [0, Validators.required]
    });
  }

  addVitals(): void {
    
    if (this.vitalForm.valid) {
      const vitals = {
        bloodType: this.bloodType,
        bloodPressure: this.bloodPressure,
        temperature: this.temperature,
        height: this.height,
        weight: this.weight,
        phoneNumber : this.phoneNumber
        
      }
    
      this.dialogRef.close(vitals);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  
  
  validateBloodPressure(control: AbstractControl) {
    const bloodPressure = control.value;
    
    
  
    if (!bloodPressure.includes('/') || bloodPressure.length > 7) {
      return { 'invalidBloodPressure': true };
    }
  
    return null;
  }
}
