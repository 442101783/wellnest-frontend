import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = "http://localhost:8080/api/user"
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private users: User[] = [];

constructor(private http:HttpClient,private router: Router){
}

signup(s : string): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<any>(this.apiUrl + "/signup", s, { headers });
}


login(credentials: { phoneNumber: string; password:string }): Observable<any>{

  return this.http.post<any>(this.apiUrl+"/login", credentials)
}

handleLogin(credentials: {phoneNumber: string; password: string}){
  this.login(credentials).subscribe({
    next: (response: any) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      if (response && response.role === 'patient') {
        this.router.navigate(['/patient-page']);
      } else if (response && response.role === 'doctor') {
        this.router.navigate(['/doctor-page']);
      } else{
      console.log("failed to log in")
      alert("failed to login")
    }
      
    }
  })
}
logout(){
  localStorage.removeItem('token');
  this.router.navigate([''])
}
getPatient(): Observable<Patient> {
return this.http.get<Patient>(this.apiUrl+"/getPatient")
}

getToken(){
  return localStorage.getItem('token')
}

isLoggedIn():boolean{
return !this.jwtHelper.isTokenExpired(this.getToken());
}

getAuthorizationHeader(): HttpHeaders {
  return new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`
  });
}
}

