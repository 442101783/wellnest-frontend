import { Appointment } from './../models/appointment';
import { Patient } from './../models/patient';
import { Injectable,} from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { AuthenticationService } from '../authentication/authentication.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

private apiUrl = "http://localhost:8080/api/user"
private appointments: Appointment[] = [];

constructor(private http:HttpClient,private authService:AuthenticationService){}

getAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl+ "/appointments")

}

getAppointment(id:string): Observable<Appointment> {
  return this.http.get<Appointment>(this.apiUrl+ "/appointment")

}

getAvailableDoctors(department:string): Observable<Doctor[]> {
  return this.http.post<Doctor[]>(this.apiUrl + "/book",  { "department": department } )


}

getAvailableAppoitntments(doctorID:string): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl+ "/availableDoctors"+doctorID)

}

addAppointment(appointment: Appointment): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/addAppointment",appointment)
}

deleteAppointment(id: string): Observable<void>{
  return this.http.delete<void>(this.apiUrl+ "/deleteAppointment"+id)
}

editAppointment(id: string, editedAppointment:Appointment): Observable<void>{
  return this.http.put<void >(this.apiUrl+ "/editAppointment" + id,editedAppointment)

}

getPatientsAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl+ "/appointments")

}
getPrescriptions(): Observable<Prescription[]>{
  return this.http.get<Prescription[]>(this.apiUrl+"/getPrescriptions")

}
getDiagnosis(): Observable<Diagnosis[]>{
  return this.http.get<Diagnosis[]>(this.apiUrl+"/getDiagnosis")

}

}
