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
  orders: Order[];
  search: string;
  nPerPage: number = 10;
  pageNumber: number = 1;
  isThereMoreData = true;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private userService: UsersService
  ) {
    this.loadOrders();
   }

  ngOnInit(): void {
  }

  jumpToPage(pageNumber){
    this.orders = [];
    if( pageNumber > 0 ){
      this.pageNumber = pageNumber;
      this.loadOrders();
    }
  }

  nextPage(){
    this.orders = [];
    this.pageNumber++;
    this.loadOrders();
  }

  previousPage(){
    if( this.pageNumber > 1 ){
      this.orders = [];
      this.pageNumber--;
      this.loadOrders();
    }
  }

  loadOrders(){ 
    const filter =
    typeof this.search == 'string' && this.search.length > 0
      ? `?searchBy=${this.search}&pageNumber=${this.pageNumber}&nPerPage=${this.nPerPage}`
      : `?pageNumber=${this.pageNumber}&nPerPage=${this.nPerPage}`
    this.ordersService.getOrders(filter).subscribe(
      (res) => {
        this.orders = res.data;
        if(res.data.length < this.nPerPage ){
          this.isThereMoreData = false;
         }else{
           this.isThereMoreData = true;
         }
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
