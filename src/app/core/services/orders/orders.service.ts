import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url: string = 'http://localhost:8000';

  order = {
    _id: '603c4c5e85921d4370127077',
    creation_date: this.getActualDate(),
    clientId: '603c4c5e85921d4550127077',
    paid_out: false,
    status: 'pending',
    delivery_address: 'Calle Falsa 123',
    shopping_cart: []
  };
  
  orders: Order[] =[
    this.order,
    {
      _id: '555c4c5e85921d4370127077',
    creation_date: this.getActualDate(),
    clientId: '603c4c5e85921d4550127077',
    paid_out: false,
    status: 'pending',
    delivery_address: 'Calle Falsa 123',
    shopping_cart: []
    },
    {
      _id: '666c4c5e85921d4370127077',
    creation_date: this.getActualDate(),
    clientId: '603c4c5e85921d4550127077',
    paid_out: false,
    status: 'pending',
    delivery_address: 'Calle Falsa 123',
    shopping_cart: []
    }
  ];

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

  createOrder(order: Order){
    return this.httpClient.post<any>(this.url + `/orders`, order, { headers: this.getHeaders() });
  }

  updateOrder(order: Order){
    console.log('update ORder');
    console.log(order);
  }

  private getActualDate(){
    const defaulDate = new Date();
    return defaulDate.toISOString().split('T')[0];
  }

  selectClient(user: User){
    this.order.clientId = user._id;
    this.order.delivery_address = user.deliveryAddress;
  } 

  getActualOrder(){
    return this.order;
  }

  getOrderById(id: string){
    let order;
    this.orders.map( (item) => {
      if(item._id === id){
        order = item;
      }
    });
    return order;
  }

  getOrders(){
    return this.orders;
  }

  addCart(product: Product, orderId: string){
    console.log(this.order.shopping_cart);
  }

}
