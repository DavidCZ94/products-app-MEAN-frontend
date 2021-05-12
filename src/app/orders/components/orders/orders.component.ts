import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/core/models/order.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  faPlus = faPlus;
  search: string;

  orders: Order[];

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.loadUsers();
   }

  ngOnInit(): void {
  }

  loadUsers(){
    this.orders = this.ordersService.getOrders();
  }

  goToOrderDetail(orderId: String){
    this.router.navigate(['admin/orders/']);
  }

  goToProductsSelection(){
    this.router.navigate(['admin/orders/products-selection'])
  }

}
