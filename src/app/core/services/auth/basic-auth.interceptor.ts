import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor{

    currentUser = this.authenticationService.currentUserValue;

    constructor(
        private authenticationService: AuthService,
        ){}
    // add authorization header with basic auth credentials if available
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{   
        if(request.url.indexOf("cloudinary") !== -1 ){
            return next.handle(request);
        }
        if(request.url.indexOf("sign-up") === -1 ){
            if( this.currentUser === null ){
                this.saveUser(request);
            }
            if (this.currentUser && this.currentUser.authdata) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Basic ${this.currentUser.authdata}`
                    }
                });
            }
        }
        return next.handle(request);
    }

    saveUser(request){
        const userEmail = request.body.userEmail;
        const userPassword = request.body.userPassword;
        this.currentUser = request.body;
        this.currentUser.authdata = window.btoa(`${userEmail}:${userPassword}`);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

}