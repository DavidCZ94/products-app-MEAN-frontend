import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  
  user: Object;
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [],
    })
  }

  saveUser(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.user = this.form.value;
      this.singUp(this.user);
    }else{
      alert('Please fill out the form with valid information.');
    }
    console.log(this.user);
  }

  singUp(user){
  }

  signUp(){
    this.router.navigate(['sing-up']);
  }

}
