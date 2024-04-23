import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { PatientHomePageComponent } from '../patient-home-page/patient-home-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentFormComponent,
    PatientHomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppointmentModule { }
