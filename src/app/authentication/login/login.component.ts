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

  closeLogin() {
    this.router.navigate(['']);
}

onKeyDown(event: KeyboardEvent) {

  const key = event.key;


  const inputElement = event.target as HTMLInputElement;


  if (inputElement.value.length >= 10 && !['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter'].includes(key)) {

    event.preventDefault();
  }


  if (!(event.ctrlKey || event.altKey || event.metaKey) && !['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter'].includes(key) && isNaN(Number(key))) {

    event.preventDefault();
  }
}

  onSubmit(): void{

    if(this.loginForm.valid){


      const credentials = {
        phoneNumber: this.loginForm.value.phoneNumber,
        password: this.loginForm.value.password
      }


  this.authService.handleLogin(credentials)

    }
    this.showPassword = false;
  }

  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
