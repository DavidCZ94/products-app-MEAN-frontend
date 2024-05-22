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
  nPerPage: number = 10;
  pageNumber: number = 1;
  isThereMoreData = true;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.loadProducts();
  }

  ngOnInit(): void {
  }

  jumpToPage(pageNumber){
    this.products = [];
    if( pageNumber > 0 ){
      this.pageNumber = pageNumber;
      this.loadProducts();
    }
  }

  nextPage(){
    this.products = [];
    this.pageNumber++;
    this.loadProducts();
  }

  previousPage(){
    if( this.pageNumber > 1 ){
      this.products = [];
      this.pageNumber--;
      this.loadProducts();
    }
  }

  loadProducts() {
    const filter =
      typeof this.search == 'string' && this.search.length > 0
        ? `?searchBy=${this.search}&pageNumber=${this.pageNumber}&nPerPage=${this.nPerPage}`
        : `?pageNumber=${this.pageNumber}&nPerPage=${this.nPerPage}`
    this.productsService.getProducts(filter).subscribe(
      (res) => {
        this.products = res.data;
        if(res.data.length < this.nPerPage ) this.isThereMoreData = false;
        else this.isThereMoreData = true;
      },
      (err) => {
        alert('An error occurred connecting to the database.');
      }
    )
  }
}
