import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { MatDialog } from '@angular/material/dialog';
import { DiagnoseFormComponent } from '../diagnose-form/diagnose-form.component';
import { PrescribeFormComponent } from '../prescribe-form/prescribe-form.component';
import { Diagnosis } from '../models/diagnosis';

@Component({
  selector: 'app-patients-appointment-list',
  templateUrl: './patients-appointment-list.component.html',
  styleUrls: ['./patients-appointment-list.component.css']
})
export class PatientsAppointmentListComponent {

    patientAppointments:Appointment[] = [];
    
    
    constructor(
      private dialog: MatDialog,
      private appointmentService :AppointmentService
    ){}
      
    openDiagnoseDialog(appointmentID: string): void {
      const dialogRef = this.dialog.open(DiagnoseFormComponent, {
        width: '300px',
        data: { appid: appointmentID }  // Pass the appointment ID to the dialog
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addDiagnosis(result.appid, result.diagnosis, result.status)
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

  
    openPrescribeDialog(): void {
      const dialogRef = this.dialog.open(PrescribeFormComponent, {
        width: '250px',
        data: { /* data if needed */ }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        // Handle result if needed
      });
    }
    ngOnInit(): void {
      this.appointmentService.getDoctorAppointments().subscribe(patientAppointments => {
        this.patientAppointments = patientAppointments
      });
  
}



}