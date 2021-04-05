import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ProductsService } from 'src/app/core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  faPlus = faPlus;

  constructor(
      private productsService: ProductsService, 
      private router: Router
      ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts()
      .subscribe(
        (res) => {
          this.products = res.data;
        },
        (err) =>{
          console.log(err);
        }
      );
  }
}
