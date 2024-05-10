import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { VitalsFormComponent } from '../vitals-form/vitals-form.component';
@Component({
  selector: 'app-nurse-home-page',
  templateUrl: './nurse-home-page.component.html',
  styleUrls: ['./nurse-home-page.component.css']
})
export class NurseHomePageComponent {

  constructor(private authService: AuthenticationService, private dialog: MatDialog) {}
  
  openDialog(phoneNumber: string): void {
    const dialogRef = this.dialog.open(VitalsFormComponent, {
      width: '250px',
      data: { phoneNumber: phoneNumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
