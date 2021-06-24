import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';

import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MyValidators } from '../../../utils/validators';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  user: User;
  form: FormGroup;
  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.minLength(2)],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword,
        ],
      ],
      passwordConfirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword,
        ],
      ]
    });
  }

  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.user = {
        ...this.form.value,
        isAdmin: true
      };
      console.log(this.user);
      delete this.user['passwordConfirmation'];
      this.singUp(this.user);
    } else {
      alert('Please fill out the form with valid information.');
    }
  }

  singUp(user: User) {
    this.authService.signUp(user).subscribe(
      (res) => {
        if (res.message === 'user created') {
          const confirmationModal = document.getElementById('confirmationModal');
          confirmationModal.querySelector('.modal-body').textContent = 'Successful sign-up';
          confirmationModal.addEventListener('hide.bs.modal', (event) => {
            this.logOut();
            this.router.navigate(['sign-in']);
          });
        }
      },
      (err) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          //window.location.reload();
        });
        localStorage.removeItem('currentUser');
      }
    );
  }

  get isPasswordValid() {
    return (
      this.form.controls.password.markAllAsTouched &&
      !this.form.controls.password.valid
    );
  }

  get isPasswordConfirmationValid() {
    const password = this.form.controls.password.value;
    const passwordConfirmation = this.form.controls.passwordConfirmation.value;
    return password === passwordConfirmation;
  }

  initModal(element): void {
    this.modalDirect = new Bootstrap.Modal(element, {
      'data-bs-backdrop': true,
      'data-bs-keyboard': false,
      'data-bs-focus': true,
    });
    this.modalDirect.show();
  }

  redirectToSignIn(){
    this.router.navigate(['sing-in']);
  }

  logOut(){
    this.authService.logout();
  }

}
