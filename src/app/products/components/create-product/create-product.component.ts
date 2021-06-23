import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';

import { Product } from 'src/app/core/models/product.model';
import { environment } from '../../../../environments/environment';
import { ProductsService } from '../../../core/services/products/products.service';
import { UploadImagesService } from "../../../core/services/uploadImages/upload-images.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  providers: [ UploadImagesService, ProductsService ]
})
export class CreateProductComponent implements OnInit {
  faCloudUploadAlt = faCloudUploadAlt;

  product: Product;
  form: FormGroup;
  file: File;
  files: File[] = [];
  imageSelected: string | ArrayBuffer;

  modalDirect: Bootstrap.Modal;
  @ViewChild('confirmationModal') input;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService,
    private uploadImagesService: UploadImagesService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      sku: [''],
      brand: ['', [Validators.required]],
      class: ['', [Validators.required]],
      distributor: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      position: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],
      cost_price: ['', [Validators.required]],
      tags: [''],
      isActive: [true]
    })
  }

  formAction(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.product = {
        'sku' : this.form.value.sku,
        'name' : this.form.value.name,
        'brand' : this.form.value.brand,
        'class' : this.form.value.class,
        'distributor' : this.form.value.distributor,
        'stock' : this.form.value.stock,
        'position' : this.form.value.position,
        'sale_price' : this.form.value.sale_price, 
        'cost_price' : this.form.value.cost_price,
        'tags' : this.form.value.tags.split(','),
        'productPictures': [],
        'isActive': this.form.value.isActive
      };
      this.addPicturesUrl(this.files);
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

  addPicturesUrl(files : File[]){
    let imageUploadObservables = [];
    files.map(
      file => {
        imageUploadObservables.push(this.onUploadImage(file));
      }
    );
    const uploadResponse = forkJoin( imageUploadObservables );
    uploadResponse.subscribe(
      (res) => {
        res.map(
          ( res ) => this.product.productPictures.push( res['secure_url'] )
        )
        this.createProduct(this.product);
      }
    );
  }

  onUploadImage(file: File){
    if ( file ){
      const file_data = file;
      const data = new FormData();
      data.append("file", file_data);
      data.append('upload_preset', environment.cloudinaryUploadPreset);
      data.append('cloud_name', environment.cloudinaryCloudName);
      return this.uploadImagesService.uploadImage(data);
    }
  }

  onSelect(event) {
    //console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    //console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
