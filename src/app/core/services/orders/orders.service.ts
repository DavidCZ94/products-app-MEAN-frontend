import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
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
    this.order,
    this.order,
    this.order,
    this.order,
  ];

  shoppintCart : string[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
  ) {
    this.shoppingCartService.cart$.subscribe(
      products => {
        this.order.shopping_cart = products; 
      }
    )
  }

  getActualDate(){
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

  getOrder(){
    return this.order;
  }

  getOrders(){
    return this.orders;
  }

  addCart(product: Product, orderId: string){
    console.log(this.order.shopping_cart);
  }

}
