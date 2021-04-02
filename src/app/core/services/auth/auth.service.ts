import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private url: string = 'http://localhost:8000';

  constructor(
    private httpClient: HttpClient,
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signIn(userData: User) {
    const userEmail = userData.email;
    const userPassword = userData.password;
    const rememberMe = userData.rememberMe;
    
    return this.httpClient.post<any>(this.url + '/auth/sign-in', { userEmail, userPassword, rememberMe})
    .pipe(map(user => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      user.authdata = window.btoa(userEmail + ':' + userPassword);
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  logedIn(){
    const currentUserToken = JSON.parse(localStorage.getItem('currentUser'));
    //Return true or false depending of jsonCurrentUser.token existence
    return !!currentUserToken;
  }

  signUp(user: User) {
    return this.httpClient.post<any>(this.url + '/auth/sign-up', user);
  }
}
