import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { UsersService } from '../../../core/services/users/users.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  faPlus = faPlus;
  search: String = '';

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
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
