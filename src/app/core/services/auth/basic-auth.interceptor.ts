import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor{
    constructor(
        private authenticationService: AuthService,
        ){}
    // add authorization header with basic auth credentials if available
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{   
        let currentUser = this.authenticationService.currentUserValue;
        if(this.authenticationService.currentUserValue === null){
            const userEmail = request.body.userEmail;
            const userPassword = request.body.userPassword;
            currentUser = request.body;
            currentUser.authdata = window.btoa(`${userEmail}:${userPassword}`);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.authdata}`
                }
            });
        }
        return next.handle(request);
    }

}