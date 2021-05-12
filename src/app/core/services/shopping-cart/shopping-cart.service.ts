import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private products: object[] = [];
  private sortedProducts: object[] = [];
  private qtyProducts = new BehaviorSubject<number>(0);
  private cart = new BehaviorSubject<any[]>([]);

  cart$ = this.cart.asObservable();
  qtyProducts$ = this.qtyProducts.asObservable();

  constructor() { }

  addProduct(product: object){
    this.products = [...this.products, product];
    this.sortedProducts = this.sortProducts(this.products, '_id');
    this.cart.next(this.sortedProducts);
    this.qtyProducts.next(this.products.length);
  }

  sortProducts(objects: object[], key: string){
    const countedObjects: object[] = [];

    for (const object of objects) {
      const qty: any = objects.filter(obj => obj[key] === object[key]).length;

      if (!countedObjects.find(obj => obj[key] === object[key])) {
        countedObjects.push({...object, qty});
      }
    }
    return countedObjects;
  }
}
