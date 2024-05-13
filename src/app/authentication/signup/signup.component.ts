import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  

 signupForm: FormGroup = new FormGroup({});
 responseMessage: any;
  
 constructor(private formBuilder:FormBuilder,
  private authenticationService:AuthenticationService,
  private router:Router,
  private activatedRoute:ActivatedRoute,
  private snackBar: MatSnackBar
){}
 
 ngOnInit(): void {

  this.signupForm = this.formBuilder.group({
    fname:['', [Validators.required, Validators.maxLength(12)]],
    lname:['',[Validators.required, Validators.maxLength(12)]],
    phoneNumber:['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    password:['',[Validators.required,Validators.minLength(8),this.checkPassword()]],
    confirmPassword:['',[Validators.required,Validators.minLength(8),this.passwordMatchValidator()]],
    gender:['',Validators.required],
    dob:['',Validators.required],

 })
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

onNameKeyDown(event: KeyboardEvent) {

  const key = event.key;


  if (!(event.ctrlKey || event.altKey || event.metaKey) && !['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter'].includes(key) && !(/[a-zA-Z]/.test(key))) {

    event.preventDefault();
  }
}

 closeLogin() {
  this.router.navigate(['']);
}


 passwordMatchValidator() {
  return (control: AbstractControl) => {
    const pass = control.root.get('password');
    const confirmPass = control.root.get('confirmPassword');

    if (pass && confirmPass && pass.value !== confirmPass.value) {
      return { passwordMismatch: true, message: 'Passwords do not match.' };
    } else {
      return null;
    }
  };
}

 checkPassword() {
  return (control: AbstractControl) => {
    const value = control.value;
    const hasCapital = /[A-Z]/.test(value);
    const hasSmall = /[a-z]/.test(value);
    const hasSymbol = /[@#&.]/.test(value);
    const isLengthValid = value && value.length >= 8 && value.length <= 20;
     

    if (!hasCapital) {
      return { missingCapital: true, message: 'Password must contain at least one capital letter.' };} 
      
      if (!hasSmall) {
      return { missingSmall: true, message: 'Password must contain at least one small letter.' };}  
      
      if (!hasSymbol) {
      return { missingSymbol: true, message: 'Password must contain at least one symbol.' };}  
      
      if (!isLengthValid) {
      return { minLength: true, message: 'Password must be at least 8 characters long.' };
    }

    return null;
  };
}


   onSubmit(){
    if(this.signupForm.valid){

      this.snackBar.open("Sign up successful", 'Close', {
        duration: 5000
      })
      var formData = this.signupForm.value;
      var data = {
       fname: formData.fname,
       lname: formData.lname,
       password: formData.password,
       phoneNumber: formData.phoneNumber,
       dob: formData.dob,
       gender: formData.gender

      }

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(formData.password)) {
       this.authenticationService.signup(JSON.stringify(data)).subscribe({
        next: () => this.router.navigate(['']),
        error: () =>   this.snackBar.open('Phone number already exists.', 'Close', {
          duration: 5000
        })
       })
      }
       


    } else {
       console.log('weak password');
       alert("weak password")
    }
    }
  }

  

