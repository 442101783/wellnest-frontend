import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-end-confirmation-dialog',
  templateUrl: './end-confirmation-dialog.component.html',
  styleUrls: ['./end-confirmation-dialog.component.css']
})
export class EndConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EndConfirmationDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
