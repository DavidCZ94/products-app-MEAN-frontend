import { Component, OnInit } from '@angular/core';
import { faPlus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { UsersService } from '../../../core/services/users/users.service';
import { User } from '../../../core/models/user.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-selection',
  templateUrl: './client-selection.component.html',
  styleUrls: ['./client-selection.component.scss']
})
export class ClientSelectionComponent implements OnInit {

  /* Icons */
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  users: User[] = [];
  search: String = '';

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  selectClient(user: User){
    this.ordersService.selectClient(user);
  }

  gotToProductSelection(){
    this.router.navigate(['admin/orders/products-selection']);
  }

  loadUsers(){
    const filter =
      typeof this.search == 'string' && this.search.length > 0
        ? `?searchBy=${this.search}`
        : ''
      this.usersService.getUsers(filter).subscribe(
        (res) => {
          this.users = res.data;
        },
        (err) =>{
          alert('An error occurred connecting to the database.');
        }
      )
  }
}
