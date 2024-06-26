import { Component, OnInit, ViewChild , Renderer2, ElementRef} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { UsersService } from 'src/app/core/services/users/users.service';

import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  user: User;
  form: UntypedFormGroup;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('showPasswordCheck') showPasswordCheck: ElementRef;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private usersService: UsersService
    )
    {
      if( JSON.parse(localStorage.getItem('currentUser')) !== null ){
        this.validateToken();
      }else{
        this.logOut();
      }
      this.buildForm();
    }

  ngOnInit(): void {}

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [],
    })
  }

  validateToken(){
    this.usersService.getUser(this.authService.currentUserValue['user'].id)
      .subscribe(
        () => {
          this.redirectToAdminHome();
        },
        () => {
          this.logOut();
        }
      )
  }

  formAction(event: Event){
    event.preventDefault();
    if(this.form.valid){
      if (this.form.value.rememberMe === null) {
        this.form.value.rememberMe = false ;
      }

      this.user = this.form.value;

      this.singIn(this.user);
    }else{
      alert('Please fill out the form with valid information.');
    }
  }

  singIn(user: User){
    this.authService.signIn(user).subscribe(
      (res) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Successful sign-in';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          this.redirectToAdminHome();
        });
      },
      (err) => {
        // Add action for unauthorized user
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          window.location.reload();
        });
        localStorage.removeItem('currentUser');
      }
    );
  }

  initModal(element): void{
    this.modalDirect = new Bootstrap.Modal(element,{
      'data-bs-backdrop': true,
      'data-bs-keyboard': false,
      'data-bs-focus': true,
    });
    this.modalDirect.show();

  }

  redirectToAdminHome(){
    this.router.navigate(['admin/home']);
  }

  redirectToSignUp(){
    this.logOut();
    this.router.navigate(['sing-up']);
  }

  redirectToSignIn(){
    this.router.navigate(['sing-in']);
  }

  showPassword(){
    if( this.showPasswordCheck.nativeElement.checked === true){
      this.renderer.setAttribute(this.passwordInput.nativeElement, "type", "text");
    }else{
      this.renderer.setAttribute(this.passwordInput.nativeElement, "type", "password");
    }
  }

  logOut(){
    this.authService.logout();
    this.redirectToSignIn();
  }

}
