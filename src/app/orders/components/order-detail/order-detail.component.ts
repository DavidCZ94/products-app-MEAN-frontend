import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { faTrashAlt, faSave} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { Order } from 'src/app/core/models/order.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  /* icons */
  faTrashAlt = faTrashAlt;
  faSave = faSave;

  order: Order;
  orderId: string;
  form: FormGroup;
  client: User;
  amount: number;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private userService: UsersService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params.id;
    }); 
    if ( this.orderId === undefined ) {
      this.order = this.ordersService.getOrder();
    }else {
      this.order = this.getOrder(this.orderId);
    }
    this.getClient(this.order.clientId);
    this.amount = this.calcTotalAmount(this.order);
    this.buildForm(this.ordersService.getOrder());
   }

  ngOnInit(): void {
  }
  
  getClient( userId: string ){
    this.userService.getUser(userId)
      .subscribe(
        (res) => { 
          this.client = res.data;
        },
        (err) => {
          alert("An error occurred connecting to the database.");
        }
      )
  }

  calcTotalAmount(order: Order){
    let amount = 0;
    order.shopping_cart.map( product => {
      amount = amount + (product.qty * product.sale_price);
    } );
    return amount;
  }

  /* CRUD */

  saveOrder(event: Event){
    event.preventDefault();
    console.log(this.form.value);
    console.log(this.order);
    if( this.form.valid ){
      this.order = this.form.value;
    }
    this.updateOrder(this.order, this.orderId);
  }

  getOrder(id: string){
    return this.ordersService.getActualOrder();
  }

  updateOrder(order: Order, orderId: string){
    console.log('Update Order');
  }


  deleteOrder(id: string){
    console.log('delete Order');
    //console.log(id);
  }

  private buildForm(order: Order){
    this.form = this.formBuilder.group({
      _id: [ order._id ],
      client: [ '' ],
      creation_date: [ order.creation_date ],
      delivery_address: [ order.delivery_address ],
      paid_out: [ order.paid_out ],
      status: [ order.status ]
    });
    this.form.controls.client.disable();
    this.form.controls.creation_date.disable();
  }

  goToOrdersTable(){
    this.router.navigate(['admin/orders']);
  }

  initModal(element): void{
    this.modalDirect = new Bootstrap.Modal(element,{
      'data-bs-backdrop': true,
      'data-bs-keyboard': false,
      'data-bs-focus': true,
    });
    this.modalDirect.show();
  }

}
