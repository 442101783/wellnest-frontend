import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-diagnose-form',
  template: `
<h1 mat-dialog-title>Diagnose</h1>
    <form [formGroup]="form" mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Enter Diagnosis" formControlName="diagnosis">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option value="permanent">Permanent</mat-option>
          <mat-option value="temporary">Temporary</mat-option>
        </mat-select>
      </mat-form-field>
    </form>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSubmit()">Submit</button>
    </div>
  `
})
export class DiagnoseFormComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DiagnoseFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      diagnosis: [''],
      status: ['temporary'],
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
