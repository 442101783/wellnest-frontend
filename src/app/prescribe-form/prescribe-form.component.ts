import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diagnose-form',
  template: `
    <h1 mat-dialog-title>Prescribe</h1>
    <div mat-dialog-content>
      <form>
        <!-- Form fields here -->
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button [mat-dialog-close]="formData" cdkFocusInitial>Submit</button>
    </div>
  `
})
export class PrescribeFormComponent {
  formData = {};

  constructor(public dialogRef: MatDialogRef<PrescribeFormComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
