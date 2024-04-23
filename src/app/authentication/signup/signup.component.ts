import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  

 signupForm: FormGroup = new FormGroup({});
  
 constructor(private formBuilder:FormBuilder,
  private authenticationService:AuthenticationService,
  private router:Router,
  private activatedRoute:ActivatedRoute){}
 
 ngOnInit(): void {

  //password > 8 letters
  //contain capital,number,small,sympol
  this.signupForm = this.formBuilder.group({
    userName:['',Validators.required],
    password:['',[Validators.required,Validators.minLength(6)]],
    email:['',[Validators.required,Validators.email]],
    birthDate:['',Validators.required],

 })
 }
   onSubmit(){
    if(this.signupForm.valid){
      console.log("valid form")
      let id = Date.now().toString();
      let user:User = this.signupForm.value;

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(user.password)) {
       console.log('Password meets the criteria.');
       alert("sign up successful")
       this.authenticationService.signup(user)
       this.router.navigate([''])


    } else {
       console.log('weak password');
       alert("weak password")
    }
    }
  }
}
