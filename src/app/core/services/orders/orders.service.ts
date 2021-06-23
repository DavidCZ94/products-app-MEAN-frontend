import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  order = {
    _id: '',
    clientId: '',
    clientName: '',
    paid_out: false,
    status: 'pending',
    delivery_address: '',
    shopping_cart: []
  };
  
  orders: Order[];

  shoppintCart : string[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private httpClient: HttpClient
  ) {
    this.shoppingCartService.cart$.subscribe(
      products => {
        this.order.shopping_cart = products; 
      }
    )
  }

  private getHeaders(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token;
    const  httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      token: token
    });
    return httpHeaders;
  }

  resetOrder(){
    this.order = {
      _id: '',
      clientId: '',
      clientName: '',
      paid_out: false,
      status: 'pending',
      delivery_address: '',
      shopping_cart: []
    };
    this.shoppintCart = [];
  }

  createOrder(order: Order){
    return this.httpClient.post<any>(environment.apiUrl + `/orders`, order, { headers: this.getHeaders() });
  }

  updateOrder(order: Order, orderId: string){
    return this.httpClient.put<any>(environment.apiUrl + `/orders/${orderId}`, order, { headers: this.getHeaders() });
  }

  selectClient(user: User){
    this.order.clientId = user._id;
    this.order.clientName = user.name;
    this.order.delivery_address = user.deliveryAddress;
  } 

  getActualOrder(){
    return this.order;
  }

  getOrderById(_id: string){
    return this.httpClient.get<any>(environment.apiUrl + `/orders/${_id}`, { headers: this.getHeaders() });
  }

  getOrders(filter){
    return this.httpClient.get<any>(environment.apiUrl + `/orders${filter}`, { headers: this.getHeaders() } );
  }
}
