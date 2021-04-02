import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Router } from '@angular/router';

import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.getProduct(id);
    });
  }

  getProduct(id: string){
    //this.product = this.productService.getProduct(id); 
    this.productService.getProduct(id)
    .subscribe(
      (res) =>{
        this.product = res.data;
      },
      (err) => {
        console.log(err);
      }
    ); 
  }

  goToProductsTable(){
    this.router.navigate(['admin/products']);
  }
}
