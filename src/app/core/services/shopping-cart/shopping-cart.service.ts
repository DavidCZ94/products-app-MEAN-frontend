import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private products: Product[] = [];
  private sortedProducts: Product[];
  private qtyProducts = new BehaviorSubject<number>(0);
  private cart = new BehaviorSubject<Product[]>([]);
  private amount = new BehaviorSubject<number>(0);

  cart$ = this.cart.asObservable();
  qtyProducts$ = this.qtyProducts.asObservable();
  amount$ = this.amount.asObservable();

  constructor() { }

  addProduct(productTadd: Product){
    if(productTadd.stock > 0){
      if (productTadd.qty === undefined) {
        productTadd.stock--;
        this.products = [...this.products, productTadd];
        this.sortedProducts = this.sortProducts(this.products, '_id');
        this.cart.next(this.sortedProducts);
        this.qtyProducts.next(this.products.length);
      }else{
        this.sortedProducts.map((product)=> {
          if (product === productTadd &&  product.qty > 0) {
            product.qty++;
            product.stock--;
          }
        });
        this.cart.next(this.sortedProducts);
        this.qtyProducts.next(this.products.length);
      }
    }
    this.calcTotalAmount(this.sortedProducts);
  }

  deleteFromCart(productToDelete: Product){
    this.sortedProducts.map((product)=> {
      if (product === productToDelete &&  product.qty > 0) {
        product.qty--;
        product.stock++;
      }
    });
    this.cart.next(this.sortedProducts);
    this.qtyProducts.next(this.products.length);
    this.calcTotalAmount(this.sortedProducts);
  }

  sortProducts(objects: Product[], key: string){
    const countedObjects: Product[] = [];

    for (const object of objects) {
      const qty: any = objects.filter(obj => obj[key] === object[key]).length;

      if (!countedObjects.find(obj => obj[key] === object[key])) {
        countedObjects.push({...object, qty});
      }
    }
    return countedObjects;
  }

  calcTotalAmount(sortedProducts: Product[]){
    let amount = 0;
    sortedProducts.map( product => {
      amount += (product.qty * product.sale_price);
    } );
    this.amount.next(amount);
  }
}
