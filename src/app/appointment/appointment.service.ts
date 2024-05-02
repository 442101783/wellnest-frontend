import { Appointment } from './../models/appointment';
import { Patient } from './../models/patient';
import { Injectable,} from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

private apiUrl = "http://localhost:3001"
private appointments: Appointment[] = [];

constructor(private http:HttpClient,private authService:AuthenticationService){}

getAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl+ "/appointments/"+this.authService.getToken)

}

getAppointment(id:string): Observable<Appointment> {
  return this.http.get<Appointment>(this.apiUrl+ "/appointment/"+this.authService.getToken)

}

addAppointment(appointment: Appointment): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/appointment/",appointment)
}

deleteAppointment(id: string): Observable<void>{
  return this.http.delete<void>(this.apiUrl+ "/appointment/"+id)
}

editAppointment(id: string, editedAppointment:Appointment): Observable<void>{
  return this.http.put<void >(this.apiUrl+ "/appointment/" + id,editedAppointment)

}

//getDoctors(): Observable<Doctor>{

//}

}
