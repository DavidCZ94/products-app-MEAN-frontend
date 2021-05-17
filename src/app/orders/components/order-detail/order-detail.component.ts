import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { faTrashAlt, faSave, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { Order } from 'src/app/core/models/order.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Product } from 'src/app/core/models/product.model';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  /* icons */
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  faPlus = faPlus;
  faMinus = faMinus;

  order: Order;
  newOrder: boolean;
  orderId: string;
  form: FormGroup;
  client: User;
  amount$: Observable<number>;
  disabledDeleteOrder: boolean;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  @ViewChild('deleteButton', { static: false }) deleteButton: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private userService: UsersService,
    private shoppingCartService: ShoppingCartService,
    private renderer2 :Renderer2
  ) {}

  ngOnInit(): void {
    this.amount$ = this.shoppingCartService.amount$;
    this.route.params.subscribe((params: Params) => {
      this.orderId = params.id;
    }); 
    if ( this.orderId === 'undefined' ) {
      this.order = this.getActualOrder();
      this.disabledDeleteOrder = true;
      this.newOrder = true;
    }else {
      this.order = this.getOrderById(this.orderId);
      this.disabledDeleteOrder = false;
      this.newOrder = false;
    }
    this.buildForm(this.order);
    this.getClient(this.order.clientId);
  }
  
  getActualOrder(){
    return this.ordersService.getActualOrder();
  }

  getOrderById(id: string){
    return this.ordersService.getOrderById(id);
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

  addToCart(product: Product){
    this.shoppingCartService.addProduct(product);
  }

  deleteFromCart(product: Product){
    this.shoppingCartService.deleteFromCart(product);
  }

  /* CRUD */

  formAction(event: Event){
    event.preventDefault();
  }

  saveOrder(){
    if (this.newOrder) {
      delete this.order._id;
      this.createOrder(this.order);
    }else{
      this.updateOrder(this.order);
    }
  }

  createOrder(order: Order){
    this.ordersService.createOrder(order)
    .subscribe(
      (res) => {
        this.order = null;
        this.orderId = null;
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Order saved successfully';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          this.goToOrdersTable();
        });
      },
      (err) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
      }
    );
  }

  updateOrder(order: Order){
    this.ordersService.updateOrder(order);
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

  goToClientSelection(){
    this.router.navigate(['admin/orders/client-selection']);
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
