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

  private apiUrl = "http://localhost:3001"
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private users: User[] = [];

constructor(private http:HttpClient,private router: Router){
}

signup(user:User): Observable<any>{
return this.http.post<any>(this.apiUrl,JSON.stringify(user))
}

login(phoneNumber: number,password:string): Observable<any>{

  return this.http.post<any>(this.apiUrl+"/login/",{phoneNumber,password}).pipe(map(response => {
    if (response && response.token){
      localStorage.setItem('token',response.token);
      return true;
    }
    return false;
  })
  )

}
logout(){
  localStorage.removeItem('token');
  this.router.navigate([''])
}
getPatient(): Observable<Patient> {
return this.http.get<Patient>(this.apiUrl+"/getPatient/"+this.getToken())
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

