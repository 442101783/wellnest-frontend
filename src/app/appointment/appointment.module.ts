import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { PatientHomePageComponent } from '../patient-home-page/patient-home-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DoctorHomePageComponent } from '../doctor-home-page/doctor-home-page.component';
import { PatientsAppointmentListComponent } from '../patients-appointment-list/patients-appointment-list.component';

@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentFormComponent,
    PatientHomePageComponent,
    DoctorHomePageComponent,
    PatientsAppointmentListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppointmentModule { }
