import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CreateProductComponent } from './components/create-product/create-product.component';


@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent, CreateProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule
  ]
})
export class ProductsModule { }
