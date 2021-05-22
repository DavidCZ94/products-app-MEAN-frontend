import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ProductsService } from 'src/app/core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  faPlus = faPlus;
  productsFounded: String = '';
  search: String = '';

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.loadProducts();
  }

  ngOnInit(): void {
  }

  loadProducts() {
    const filter =
      typeof this.search == 'string' && this.search.length > 0
        ? `?searchBy=${this.search}`
        : ''
    this.productsService.getProducts(filter).subscribe(
      (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      (err) => {
        alert('An error occurred connecting to the database.');
      }
    )
  }
}
