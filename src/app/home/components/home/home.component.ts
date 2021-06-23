import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faDollyFlatbed, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /* Icons */

  faShoppingCart = faShoppingCart;
  faDollyFlatbed = faDollyFlatbed;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
  }

}
