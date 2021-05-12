import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-order-navar',
  templateUrl: './order-navar.component.html',
  styleUrls: ['./order-navar.component.scss']
})
export class OrderNavarComponent implements OnInit {

  faShoppingCart = faShoppingCart;

  totalProducts$: Observable<number>;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {
    this.totalProducts$ = this.shoppingCartService.qtyProducts$;
   }

  ngOnInit(): void {
  }

}
