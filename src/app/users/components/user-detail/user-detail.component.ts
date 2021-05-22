import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { faTrashAlt, faSave} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  /* icons */
  faTrashAlt = faTrashAlt;
  faSave = faSave;

  user: User;
  userId: string;
  form: FormGroup;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params.id;
      this.getUser(this.userId);
    });
  }

/* CRUD */

  saveUser(event: Event){
    event.preventDefault();
    if( this.form.valid ){
      this.user = this.form.value;
    }
    this.updateUser(this.user, this.userId);
  }

  updateUser(user: User, userId: string){
    this.route.params.subscribe((params: Params) => {
      this.usersService.updateUser(user, this.userId)
      .subscribe(
        (res) => {
          console.log('Success');
          console.log(res);
          const confirmationModal = document.getElementById('confirmationModal');
          confirmationModal.querySelector('.modal-body').textContent = 'User saved successfully';
          confirmationModal.addEventListener('hide.bs.modal', (event) => {
            this.goToUsersTable();
          });
        },
        (err) => {
          console.log('Error');
          console.log(err);
          const confirmationModal = document.getElementById('confirmationModal');
          confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
        }
        );
      });
  }

  getUser(id: string){
    this.usersService.getUser(id)
    .subscribe( 
      (res) => {
        this.user = this.buildUser({
          ...res.data,
          id
        });
        this.buildForm(this.user);
      } ,
      (err) => {
        console.log(err);
      }
      )
  }

  deleteUser(id: string){
    this.usersService.deleteUser(id)
    .subscribe(
      (res) => {
        this.goToUsersTable();
      },
      (err) => {
        alert('Something wrong to try delete this user, try again.');
      });
  }

  private buildUser(user){
    const newUser = {
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      deliveryAddress: user.deliveryAddress || '',
      birthDate : user.birthDate.split("T")[0] ,
      documentNumber : user.documentNumber || '',
      orders : user.orders || [''],
      isAdmin : user.isAdmin || false
    }    
    return newUser;
  }

  private buildForm(user: User){
    this.form = this.formBuilder.group({
      _id: [ user._id],
      name: [ user.name, [Validators.required]],
      email: [ user.email, [Validators.required]],
      phone: [ user.phone ],
      deliveryAddress: [ user.deliveryAddress],
      birthDate: [ user.birthDate ], 
      documentNumber: [ user.documentNumber],
      orders: [ user.orders],
      isAdmin: [ user.isAdmin],
    });
    this.form.controls.birthDate.disable();
  }

  goToUsersTable(){
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.querySelector('.modal-body').textContent = '';
    this.router.navigate(['admin/users']);
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
