import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

import { ProductsService } from 'src/app/core/services/products/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {
  
  faPlus = faPlus;

  products: Product[] = [];
  shoppingCart: string[] = [];
  productsFounded: String = '';
  search: String = '';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const filter =
      typeof this.search == 'string' && this.search.length > 0
        ? `?searchBy=${this.search}`
        : ''
    this.productsService.getProducts(filter).subscribe(
      (res) => {
        this.products = res.data;
      },
      (err) => {
        alert('An error occurred connecting to the database.');
      }
    )
  }

  addToCart(product: object){
    this.shoppingCartService.addProduct(product);
  }

  goToClientSelection(){
    this.router.navigate(['admin/orders/client-selection']);
  }

  goToOrdersTable(){
    this.router.navigate(['admin/orders/orders-table']);
  }
}
