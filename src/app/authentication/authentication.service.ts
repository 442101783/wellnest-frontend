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

signup(user:User): boolean{
//need checking if the user already exist
  let signupAttempt = false;
  user.id = Date.now().toString();


  this.users.push(user);
  localStorage.setItem("users",JSON.stringify(this.users));

  signupAttempt = true;
  return signupAttempt
}

login(email:string,password:string): boolean{
let loginAttempt = false
if(this.users.find(u => u.email === email && u.password === password)){
loginAttempt = true
return loginAttempt
}
return loginAttempt
}
}

