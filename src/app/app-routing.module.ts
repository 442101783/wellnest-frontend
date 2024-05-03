import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { HomeComponent } from './home/home.component';
import { DoctorHomePageComponent } from './doctor-home-page/doctor-home-page.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"patient-page",component:PatientHomePageComponent},
  {path:"new",component:AppointmentFormComponent},
  {path:"list",component:AppointmentListComponent},
  {path:"edit/:appointmentID",component:AppointmentFormComponent},
  {path:"doctor-page",component:DoctorHomePageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
