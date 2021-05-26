import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Order } from 'src/app/core/models/order.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { UsersService } from 'src/app/core/services/users/users.service';

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
    private router: Router,
    private userService: UsersService
  ) {
    this.loadOrders();
   }

  ngOnInit(): void {
  }

  loadOrders(){ 
    const filter =
    typeof this.search == 'string' && this.search.length > 0
      ? `?searchBy=${this.search}`
      : ''
    this.ordersService.getOrders(filter).subscribe(
      (res) => {
        this.orders = res.data;
      },
      (err) => {
        alert('An error occurred connecting to the database.');
      }
      );
  }
  goToOrderDetail(orderId: String){
    this.router.navigate(['admin/orders/']);
  }

  goToProductsSelection(){
    this.router.navigate(['admin/orders/products-selection'])
  }

}
