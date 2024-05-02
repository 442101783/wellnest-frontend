import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppointmentModule } from './appointment/appointment.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { TokenInterceptor } from './token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './authentication/authentication.service';
@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    AppointmentModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
