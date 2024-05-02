import { Injectable } from '@angular/core';
import {  HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authservice.getToken();

    if(token){
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
