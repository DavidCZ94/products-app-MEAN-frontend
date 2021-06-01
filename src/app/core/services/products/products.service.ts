import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { HttpHeaders } from '@angular/common/http';

import { Product } from '../../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
    ) {
      //this.getProducts();
    }

  getHeaders(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token;
    const  httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      token: token
    });
    return httpHeaders;
  }

  getProducts(filter){
    return this.httpClient.get<any>(environment.apiUrl + `/products${filter}`, { headers: this.getHeaders() } );
  }

  getProduct(id: string){
    return this.httpClient.get<any>(environment.apiUrl + `/products/${id}`, { headers: this.getHeaders() } );
  }

  createProduct(product: Product){
    return this.httpClient.post<any>(environment.apiUrl + '/products', product, { headers: this.getHeaders() } );
  }

  deleteProduct(id: string){
    return this.httpClient.delete<any>(environment.apiUrl + `/products/${id}`, { headers: this.getHeaders() });
  }

  updateProduct(product: Product, id: string){
    return this.httpClient.put<any>(environment.apiUrl + `/products/${id}`, product, { headers: this.getHeaders() });
  }

}
