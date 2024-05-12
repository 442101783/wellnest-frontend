import { Appointment } from './../models/appointment';
import { Injectable,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { AuthenticationService } from '../authentication/authentication.service';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
import { Vitals } from '../models/vitals';
import { Patient } from '../models/patient';
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

addAppointment(patientID:string, appID:string): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/selectAppointment", {"patientID":patientID, "appID": appID})
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


getPrescriptions(patientID:string): Observable<Prescription[]>{
  return this.http.post<Prescription[]>(this.apiUrl+"/myPrescriptions", {"patientID":patientID})

}
addPrescriptions(prescriptionData: Prescription): Observable<void>{
  return this.http.post<void>(this.apiUrl+"/addPrescription",prescriptionData)

}

getDiagnosis(patientID:string): Observable<Diagnosis[]>{
  return this.http.post<Diagnosis[]>(this.apiUrl+"/myDiagnosis", {"patientID":patientID})

}
addDiagnosis(diagnosisData: { diagnosis: string, appid: string, status: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/addDiagnosis`, diagnosisData);
}

endAppointment(appID:string): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/endAppointment", {"appid": appID})
}
cancelAppointment(appID:string): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/cancelAppointment", {"appid": appID})
}

addVitals(vitalsData: { phoneNumber: string, bloodType: string, bloodPressure: string , temprature: number , height: number , weight: number }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/addVitals`, vitalsData);
}

getPatient(patientID:string): Observable<Patient>{
  return this.http.post<Patient>(this.apiUrl+"/getPatient", {"patientID" : patientID})

}
getPatientName(phoneNumber:string): Observable<any>{
  return this.http.post<any>(this.apiUrl+"/getName", {"phoneNumber" : phoneNumber})

}

getVitals(patientID:string): Observable<Vitals[]>{
  return this.http.post<Vitals[]>(this.apiUrl+"/getVitals", {"patientID": patientID})

}

reviewAppointment(patientID:string): Observable<void>{
  return this.http.post<void>(this.apiUrl+ "/selectAppointment", {"patient": patientID})
}
}