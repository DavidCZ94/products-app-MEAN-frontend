import { Component, OnInit, ViewChild,  Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';

import { UsersService } from '../../../core/services/users/users.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  user: User;
  form: FormGroup;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  @ViewChild('passwordInput') passwordInput: ElementRef; 
  @ViewChild('showPasswordCheck') showPasswordCheck: ElementRef; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userSerivce: UsersService,
    private renderer: Renderer2
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(){
    const defaultBirthDate = new Date();
    defaultBirthDate.setFullYear(defaultBirthDate.getUTCFullYear() -18);
    this.form = this.formBuilder.group({
      name: ['David Alberto Cabrera', [Validators.required]],
      email: ['david@davi.com', [Validators.required]],
      phone: ['3333333333', [Validators.required]],
      deliveryAddress: ['calle Falsa 123'],
      birthDate: [defaultBirthDate.toISOString().split('T')[0], [Validators.required]],
      documentNumber: ['9999999999', [Validators.required]],
      password: ['12345678', [Validators.required]],
      isAdmin: [false, [Validators.required]],
    })
  }


  formAction(event: Event){
    event.preventDefault();
    this.user = this.form.value;
    this.createUser(this.user);
  }

  createUser(user){
    this.userSerivce.createUser(user)
    .subscribe( 
      (res) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'User added successfully';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          this.redirectToUsersTable();
        });
      },
      (err) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
      });
  }

  initModal(element): void{
    this.modalDirect = new Bootstrap.Modal(element,{
      'data-bs-backdrop': true,
      'data-bs-keyboard': false,
      'data-bs-focus': true,
    });
    this.modalDirect.show();
  }

  redirectToUsersTable(){
    this.router.navigate(['admin/users']);
  }

  showPassword(){
    if( this.showPasswordCheck.nativeElement.checked === true){
      this.renderer.setAttribute(this.passwordInput.nativeElement, "type", "text");
    }else{
      this.renderer.setAttribute(this.passwordInput.nativeElement, "type", "password");
    }
  }

}
