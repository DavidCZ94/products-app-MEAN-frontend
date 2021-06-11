import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { environment } from '../../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Origin': `${environment.cloudinaryApi}*`,
    'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Content-Type': 'application/json', 
    'X-Requested-With': 'XMLHttpRequest' 
  })
};

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  uploadImage(values): Observable<any>{
    let data = values;
    return this.httpClient.post(`${environment.cloudinaryApi}${environment.cloudinaryCloudName}/image/upload`, data);
  };

}
