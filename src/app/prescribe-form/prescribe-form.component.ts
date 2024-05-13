import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prescribe-form',
  template: `
    <h1 mat-dialog-title>Prescribe</h1>
    <form [formGroup]="form" mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Enter Prescription" formControlName="prescription">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Dosage</mat-label>
        <mat-select formControlName="dosage">
          <mat-option value="1">Once a day</mat-option>
          <mat-option value="2">Twice a day</mat-option>
          <mat-option value="3">Three times a day</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="expiryPicker" placeholder="Expiry Date" formControlName="expiryDate">
        <mat-datepicker-toggle matSuffix [for]="expiryPicker"></mat-datepicker-toggle>
        <mat-datepicker #expiryPicker></mat-datepicker>
      </mat-form-field>
    </form>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSubmit()" >Submit</button>
    </div>
  `
})
export class PrescribeFormComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PrescribeFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      prescription: [''],
      dosage: [''],
      expiryDate: [''],
      appid: [this.data.appid] 
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
}
