import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { faTrashAlt, faSave} from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';

import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  /* icons */
  faTrashAlt = faTrashAlt;
  faSave = faSave;

  product: Product;
  form: FormGroup;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.getProduct(id);
    });
  }

  getProduct(id: string){
    this.productService.getProduct(id)
    .subscribe(
      (res) =>{
        this.product = res.data;
        this.buildForm();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateProduct(product: Product){
    const productUpdate = {
      name: product.name,
      brand: product.brand,
      class: product.class,
      distributor: product.distributor,
      stock: product.stock,
      position: product.position,
      sale_price: product.sale_price,
      cost_price: product.cost_price,
      tags: product.tags
    };
    this.productService.updateProduct(productUpdate, product._id)
    .subscribe(
      (res) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Product saved successfully';
        confirmationModal.addEventListener('hide.bs.modal', (event) => {
          this.goToProductsTable();
        });
      },
      (err) => {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.querySelector('.modal-body').textContent = 'Something went wrong, try again.';
      });
  }

  deleteProduct(id: string){
    this.productService.deleteProduct(id)
    .subscribe(
      (res) => {
        console.log(res);
        this.goToProductsTable();
      },
      (err) => {
        console.log(err);
      });
  }

  goToProductsTable(){
    this.router.navigate(['admin/products']);
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      _id: [ this.product._id, [Validators.required]],
      name: [ this.product.name, [Validators.required]],
      brand: [ this.product.brand, [Validators.required]],
      class: [ this.product.class, [Validators.required]],
      distributor: [ this.product.distributor, [Validators.required]],
      stock: [ this.product.stock, [Validators.required]],
      position: [ this.product.position, [Validators.required]],
      sale_price: [ this.product.sale_price, [Validators.required]],
      cost_price: [ this.product.cost_price, [Validators.required]],
    });
  }

  saveProduct(event: Event){
    event.preventDefault();
    if( this.form.valid ){
      this.product = {
        '_id' : this.form.value._id,
        'sku' : this.form.value.sku,
        'name' : this.form.value.name,
        'brand' : this.form.value.brand,
        'class' : this.form.value.class,
        'distributor' : this.form.value.distributor,
        'stock' : this.form.value.stock,
        'position' : this.form.value.position,
        'sale_price' : this.form.value.sale_price,
        'cost_price' : this.form.value.cost_price,
      };
      if (Array.isArray(this.form.value.tags)){
        this.product.tags = this.form.value.tags;
      }else{
        this.product.tags = this.form.value.tags.split(',');
      }
      this.updateProduct(this.product);
    }
  }

  initModal(element): void{
    this.modalDirect = new Bootstrap.Modal(element,{
      'data-bs-backdrop': true,
      'data-bs-keyboard': false,
      'data-bs-focus': true,
    });
    this.modalDirect.show();
  }

}
