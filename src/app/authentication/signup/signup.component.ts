import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
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
    fName:['',Validators.required],
    lName:['',Validators.required],
    phoneNumber:['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    password:['',[Validators.required,Validators.minLength(8),this.checkPassword()]],
   
    email:['',[Validators.required,Validators.email]],
    gender:['',Validators.required],
    birthDate:['',Validators.required],

 })
 }

 checkPassword() {
  return (control: AbstractControl) => {
    const value = control.value;
    const hasCapital = /[A-Z]/.test(value);
    const hasSmall = /[a-z]/.test(value);
    const hasSymbol = /[$@$!%*?&]/.test(value);
    const isLengthValid = value && value.length >= 8;

    if (!hasCapital) {
      return { missingCapital: true, message: 'Password must contain at least one capital letter.' };
    } else if (!hasSmall) {
      return { missingSmall: true, message: 'Password must contain at least one small letter.' };
    } else if (!hasSymbol) {
      return { missingSymbol: true, message: 'Password must contain at least one symbol.' };
    } else if (!isLengthValid) {
      return { minLength: true, message: 'Password must be at least 8 characters long.' };
    }

    return null;
  };
}
   onSubmit(){
    if(this.signupForm.valid){

      console.log("valid form")
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
