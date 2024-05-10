import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { VitalsFormComponent } from '../vitals-form/vitals-form.component';
import { AppointmentService } from '../appointment/appointment.service';
@Component({
  selector: 'app-nurse-home-page',
  templateUrl: './nurse-home-page.component.html',
  styleUrls: ['./nurse-home-page.component.css']
})
export class NurseHomePageComponent {

  constructor(private authService: AuthenticationService, private dialog: MatDialog,private nurseService:AppointmentService) {}
  
  openDialog(): void {
    const dialogRef = this.dialog.open(VitalsFormComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.nurseService.addVitals(result)
      console.log('The dialog was closed', result);
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
