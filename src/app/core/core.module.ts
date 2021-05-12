import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortCartPipe } from './pipies/sort-cart.pipe';

@NgModule({
  exports: [
    SortCartPipe
  ],
  declarations: [
    SortCartPipe
  ],
  imports: [
    CommonModule
  ],
})
export class CoreModule { }
