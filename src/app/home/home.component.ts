import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  // Declare a boolean variable to track if the login component is open
  isLoginOpen: boolean = false;

  // Function to close the login component and remove the blur effect
  closeLogin() {
      this.isLoginOpen = false;
  }

  // Function to open the login component and apply the blur effect
  openLogin() {
      this.isLoginOpen = true;
  }

  constructor() { }

  ngOnInit(): void {
  }
  
  showHome: boolean = false;
  showService: boolean = false;
  showAbout: boolean = false;

  toggleHome() {

    if (!this.showHome){
    this.showService = false;
    this.showAbout = false;
    this.showHome = true;
    }


}

toggleService() {

  if (!this.showService){
  this.showHome = false;
  this.showAbout = false;
  this.showService = true;
}

}

  toggleAbout() {

    if (!this.showAbout){
    this.showHome = false;
    this.showService = false;
    this.showAbout = true;
    }

}
}
