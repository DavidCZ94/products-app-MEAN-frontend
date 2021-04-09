import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import { Product } from '../../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string = 'http://localhost:8000';

  constructor(
    private httpClient: HttpClient,
    ) {
      this.getProducts();
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

  getProducts(){
    return this.httpClient.get<any>(this.url + '/products', { headers: this.getHeaders() } );
  }

  getProduct(id: string){
    return this.httpClient.get<any>(this.url + `/products/${id}`, { headers: this.getHeaders() } );
  }

  createProduct(product: Product){
    return this.httpClient.post<any>(this.url + '/products', product, { headers: this.getHeaders() } );
  }

  deleteProduct(id: string){
    return this.httpClient.delete<any>(this.url + `/products/${id}`, { headers: this.getHeaders() });
  }

  updateProduct(product: Product, id: string){
    return this.httpClient.put<any>(this.url + `/products/${id}`, product, { headers: this.getHeaders() });
  }

}
