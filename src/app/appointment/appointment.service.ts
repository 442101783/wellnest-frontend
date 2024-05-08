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
  return this.http.get<Appointment[]>(this.apiUrl+ "/myAppointments")

}


getDoctors(department:string): Observable<Doctor[]> {
  return this.http.post<Doctor[]>(this.apiUrl + "/getDoctors",  { "department": department } )


}

getAvailableAppointments(doctorID:string): Observable<Appointment[]> {
  return this.http.post<Appointment[]>(this.apiUrl+ "/getAppointment", {"doctorID": doctorID })

}

addAppointment(appID:string): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/selectAppointment", {"appID": appID})
}

deleteAppointment(appID:string): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/deleteAppointment", {"appID": appID})
}

editAppointment(oldID:string, newID:string): Observable<void>{
  return this.http.post<void >(this.apiUrl+ "/editAppointment", {"oldID": oldID, "newID": newID})

}

getDoctorAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl+ "/doctorAppointments")

}
getPrescriptions(): Observable<Prescription[]>{
  return this.http.get<Prescription[]>(this.apiUrl+"/getPrescriptions")

}
addPrescriptions(prescription:Prescription): Observable<void>{
  return this.http.post<void>(this.apiUrl+"/addPrescription",{"prescription":prescription})

}

getDiagnosis(): Observable<Diagnosis[]>{
  return this.http.get<Diagnosis[]>(this.apiUrl+"/getDiagnosis")

}
addDiagnosis(diagnosis:Diagnosis): Observable<void>{
  return this.http.post<void>(this.apiUrl+"/addPrescription",{"diagnosis":diagnosis})

}

}
