import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';

import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  product: Product;
  form: FormGroup;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      class: ['', [Validators.required]],
      distributor: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      position: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],
      cost_price: ['', [Validators.required]],
      tags: ['']
    })
  }

  formAction(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.product = {
        'sku' : this.form.value.string,
        'name' : this.form.value.name,
        'brand' : this.form.value.brand,
        'class' : this.form.value.class,
        'distributor' : this.form.value.distributor,
        'stock' : this.form.value.stock,
        'position' : this.form.value.position,
        'sale_price' : this.form.value.sale_price, 
        'cost_price' : this.form.value.cost_price,
        'tags' : this.form.value.tags.split(' '),
      };
      this.createProduct(this.product);
    }
  }

  createProduct(product: Product){
    this.productsService.createProduct(product)
    .subscribe(
      (res) =>{
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Product added successfully';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          this.redirectToProductTable();
        });
      },
      (err) =>{
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
      }
    )
  }

  initModal(element): void{
    this.modalDirect = new Bootstrap.Modal(element,{
      'data-bs-backdrop': true,
      'data-bs-keyboard': false,
      'data-bs-focus': true,
    });
    this.modalDirect.show();
  }

  redirectToProductTable(){
    this.router.navigate(['admin/products']);
  }

}
