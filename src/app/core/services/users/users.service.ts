import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private getHeaders(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token;
    const httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      token: token
    });
    return httpHeaders;
  }

  getUsers(filter){
    return this.httpClient.get<any>(environment.apiUrl + `/users${filter}`, { headers: this.getHeaders() } );
  }

  getUser(id: string){
    return this.httpClient.get<any>(environment.apiUrl + `/users/${id}`, { headers: this.getHeaders() } );
  }

  createUser(user: User){
    return this.httpClient.post<any>(environment.apiUrl + '/users', user, { headers: this.getHeaders() });
  }

  deleteUser(id: string){
    return this.httpClient.delete<any>(environment.apiUrl + `/users/${id}`, { headers: this.getHeaders() });
  }

  updateUser(user: User, id: string){
    delete user._id;
    return this.httpClient.put<any>(environment.apiUrl + `/users/${id}`, user, { headers: this.getHeaders() } );
  }

}
