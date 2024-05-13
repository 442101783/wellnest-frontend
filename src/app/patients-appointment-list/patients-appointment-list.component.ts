import { Prescription } from './../models/prescription';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { MatDialog } from '@angular/material/dialog';
import { DiagnoseFormComponent } from '../diagnose-form/diagnose-form.component';
import { PrescribeFormComponent } from '../prescribe-form/prescribe-form.component';
import { Diagnosis } from '../models/diagnosis';
import { formatDate } from '@angular/common';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { CancelConfirmationDialogComponent } from '../cancel-confirmation-dialog/cancel-confirmation-dialog.component';
@Component({
  selector: 'app-patients-appointment-list',
  templateUrl: './patients-appointment-list.component.html',
  styleUrls: ['./patients-appointment-list.component.css']
})
export class PatientsAppointmentListComponent {

    patientAppointments:Appointment[] = [];
    diagnosisSubmitted: { [appointmentID: string]: boolean } = {};
    
    constructor(
      private dialog: MatDialog,
      private appointmentService :AppointmentService
    ){}
      
    openDiagnoseDialog(appointmentID: string): void {
      const dialogRef = this.dialog.open(DiagnoseFormComponent, {
        width: '300px',
        data: { appid: appointmentID }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addDiagnosis(result.appid, result.diagnosis, result.status)
          this.diagnosisSubmitted[result.appid] = true;
        }
      });
    }
    

    addDiagnosis(appointmentID: string, diagnosis: string, status: string): void {
  const diagnosisData = {
    diagnosis: diagnosis,
    appid: appointmentID,
    status: status
  };

  this.appointmentService.addDiagnosis(diagnosisData).subscribe({
    next: () => alert('Diagnosis added successfully!'),
    error: () => alert('Failed to add diagnosis')
  });
}

  
openPrescribeDialog(appointmentID: string): void {
  const dialogRef = this.dialog.open(PrescribeFormComponent, {
    width: '300px',
    data: { appid: appointmentID }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addPrescription(result.appid, result.prescription, result.dosage, result.expiryDate)
    }
  });
}

addPrescription(appointmentID: string, prescription: string, dosage: number, expiryDate: Date): void {
  
  let formattedExpiryDate = '';

  if (expiryDate) {
    try {
      formattedExpiryDate = formatDate(expiryDate, 'yyyy-MM-dd', 'en-US');
    } catch (error) {
      alert('Failed to format the expiry date. Please enter a valid date.');
      console.error('Date formatting error:', error);
      return; 
    }
  }
  const prescriptionData = {
    prescription: prescription,
    appid: appointmentID,
    dosage: dosage,
    date:formattedExpiryDate,
    expiryDate: formattedExpiryDate
  };
  this.appointmentService.addPrescriptions(prescriptionData).subscribe({
    next: () => alert('Prescription added successfully!'),
    error: () => alert('Failed to add prescription')
  });
}
    ngOnInit(): void {
      this.appointmentService.getDoctorAppointments().subscribe(patientAppointments => {
        this.patientAppointments = patientAppointments
        patientAppointments.forEach(appointment => {
          this.diagnosisSubmitted[appointment.appointmentID] = false;
      });
      });

      
  
}

endAppointment(appointmentID: string){
  this.appointmentService.endAppointment(appointmentID).subscribe({
    next: () => console.log('Appointment ended successfully'),
    error: (error) => console.error('Error ending appointment:', error)
  });
}





cancelAppointmentConfirmation(appointmentID: string): void {
  const dialogRef = this.dialog.open(CancelConfirmationDialogComponent , {
    width: '300px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.cancelAppointment(appointmentID);
    }
  });
}

cancelAppointment(appointmentID: string){
  this.appointmentService.missedAppointment(appointmentID).subscribe({
    next: () => console.log('Appointment canceled successfully'),
    error: (error) => console.error('Error canceling appointment:', error)
  });
}

openProfileDialog(patientID: string){

  const dialogRef = this.dialog.open(ProfileDialogComponent, {
    width: '90vw',
    height:'85vh',
    data: { patientID: patientID }
  });


}

openReviewDialog(patientID: string){

  const dialogRef = this.dialog.open(ReviewDialogComponent, {
    width: '90vw',
    height:'65vh',
    data: { patientID: patientID }
  });


}

}