import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  signUp(user){
    return this.http.post<any>(this.url + '/auth/sign-up', user);
  }

}
