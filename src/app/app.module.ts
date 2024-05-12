import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppointmentModule } from './appointment/appointment.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { TokenInterceptor } from './token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './authentication/authentication.service';
import { DoctorHomePageComponent } from './doctor-home-page/doctor-home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DiagnoseFormComponent } from './diagnose-form/diagnose-form.component';
import { PrescribeFormComponent } from './prescribe-form/prescribe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NurseHomePageComponent } from './nurse-home-page/nurse-home-page.component';
import { VitalsFormComponent } from './vitals-form/vitals-form.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { CancelConfirmationDialogComponent } from './cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { EditAppointmentDialogComponent } from './edit-appointment-dialog/edit-appointment-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DiagnoseFormComponent,
    PrescribeFormComponent,
    NurseHomePageComponent,
    VitalsFormComponent,
    ProfileDialogComponent,
    ReviewDialogComponent,
    CancelConfirmationDialogComponent,
    EditAppointmentDialogComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
