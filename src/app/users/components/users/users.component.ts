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
  nPerPage: number = 10;
  pageNumber: number = 1;
  isThereMoreData = true;

  constructor(
    private usersService: UsersService
  ) {
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  jumpToPage(pageNumber){
    this.users = [];
    if( pageNumber > 0 ){
      this.pageNumber = pageNumber;
      this.loadUsers();
    }
  }

  nextPage(){
    this.users = [];
    this.pageNumber++;
    this.loadUsers();
  }

  previousPage(){
    if( this.pageNumber > 1 ){
      this.users = [];
      this.pageNumber--;
      this.loadUsers();
    }
  }

  loadUsers(){
    const filter =
      typeof this.search == 'string' && this.search.length > 0
        ? `?searchBy=${this.search}&pageNumber=${this.pageNumber}&nPerPage=${this.nPerPage}`
        : `?pageNumber=${this.pageNumber}&nPerPage=${this.nPerPage}`
      this.usersService.getUsers(filter).subscribe(
        (res) => {
          this.users = res.data;
          if(res.data.length < this.nPerPage ){
            this.isThereMoreData = false;
           }else{
             this.isThereMoreData = true;
           }
        },
        (err) =>{
          alert('An error occurred connecting to the database.');
        }
      )
  }

}
