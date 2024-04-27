import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = "http://localhost:3001"
  private users: User[] = [];

constructor(private http:HttpClient){
  let savedUsers = localStorage.getItem("users");
  this.users = savedUsers? JSON.parse(savedUsers):[];

  
}

signup(user:User): Observable<any>{
return this.http.post<any>(this.apiUrl,JSON.stringify(user))
}

login(value:any): Observable<any>{
  console.log(JSON.stringify(value))

  return this.http.get<any>(this.apiUrl+"/login/",value)

}
}

