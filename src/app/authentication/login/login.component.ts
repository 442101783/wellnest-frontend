import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
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
  console.log(JSON.stringify(this.loginForm.value))


  let user:User = this.loginForm.value;
  this.authenticationService.login(this.loginForm.value).subscribe(
    (response) => {
    if(response){
      this.router.navigate(['/patient-page'])
    } else{
      console.log("failed to log in")
      alert("failed to login")
    }
  }
  ) 
    }
  }
}
