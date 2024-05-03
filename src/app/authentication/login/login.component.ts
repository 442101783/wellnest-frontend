import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpRequest, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthenticationService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}
  
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber:['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }
  onSubmit(): void{

    if(this.loginForm.valid){


  let user:User = this.loginForm.value;
  this.authService.login(user.phoneNumber,user.password).subscribe(
    (response) => {
      if (response && response.userType === 'patient') {
        this.router.navigate(['/patient-page']);
      } else if (response && response.userType === 'doctor') {
        this.router.navigate(['/doctor-page']);
      }
        
        }
      )
    } else{
      console.log("failed to log in")
      alert("failed to login")
    }
  }
  
    }
  
