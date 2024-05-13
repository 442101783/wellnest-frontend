import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-vitals-form',
  templateUrl: './vitals-form.component.html',
  styleUrls: ['./vitals-form.component.css']
})
export class VitalsFormComponent implements OnInit {
  
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
      phoneNumber:'',
      bloodType: ['', Validators.required],
      bloodPressure: ['', [Validators.required, this.validateBloodPressure]],
      temperature: ['', [Validators.required, Validators.min(20), Validators.max(45)]], 
      height: [null, [Validators.required, Validators.min(0.5), Validators.max(2.5)]], 
      weight: [null, [Validators.required, Validators.min(5), Validators.max(300)]] 
    });
    
  }
  ngOnInit(): void {
    
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
    const bloodPressurePattern = /^\d{1,3}\/\d{1,3}$/;
    if (!bloodPressurePattern.test(control.value)) {
      return { invalidBloodPressure: true };
    }
    return null;
  }

  validateInput(event: KeyboardEvent): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    const allowedChars = /^[0-9.]*$/; // Allow digits and period
    const specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

    if (specialKeys.indexOf(event.key) !== -1 || (allowedChars.test(event.key))) {
      if (event.key === '.') {
        if (inputValue.length !== 1 || inputValue.indexOf('.') !== -1) { 
        }
      }
    } else {
      event.preventDefault();
    }
  }
}
