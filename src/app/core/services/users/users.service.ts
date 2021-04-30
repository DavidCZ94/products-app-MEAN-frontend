import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = 'http://localhost:8000';

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
    return this.httpClient.get<any>(this.url + `/users${filter}`, { headers: this.getHeaders() } );
  }

  getUser(id: string){
    return this.httpClient.get<any>(this.url + `/users/${id}`, { headers: this.getHeaders() } );
  }

  createUser(user: User){
    return this.httpClient.post<any>(this.url + '/users', user, { headers: this.getHeaders() });
  }

  deleteUser(id: string){
    return this.httpClient.delete<any>(this.url + `/users/${id}`, { headers: this.getHeaders() });
  }

  updateUser(user: User, id: string){
    return this.httpClient.put<any>(this.url + `/users/${id}`, user, { headers: this.getHeaders() } );
  }

}
