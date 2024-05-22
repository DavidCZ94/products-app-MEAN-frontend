import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): boolean{
    if(this.authService.logedIn()){
      return true;
    };
    this.router.navigate(['sing-in']);
    return false;
  }
  
}
