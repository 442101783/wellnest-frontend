import { Appointment } from './../models/appointment';
import { Patient } from './../models/patient';
import { Injectable,} from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

private apiUrl = "http://localhost:3001"
private appointments: Appointment[] = [];

constructor(private http:HttpClient){}

getAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl+ "/appointments")

}

getAppointment(id:string): Observable<Appointment> {
  return this.http.get<Appointment>(this.apiUrl+ "/appointment/"+id)

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
