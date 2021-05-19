import { Pipe, PipeTransform } from '@angular/core';
import { count } from 'rxjs/operators';

@Pipe({
  name: 'sortCart'
})
export class SortCartPipe implements PipeTransform {

  transform(objects: object[], key: string): any {
    const countedObjects: object[] = [];

    for (const object of objects) {
      const qty: any = objects.filter(obj => obj[key] === object[key]).length;

      if (!countedObjects.find(obj => obj[key] === object[key])) {
        countedObjects.push({...object, qty});
      }
    }
    return objects;
  }

}
