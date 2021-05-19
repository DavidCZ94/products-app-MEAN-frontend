import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortCartPipe } from './pipes/sort-cart.pipe';
import { ClientNamePipe } from './pipes/client-name.pipe';

@NgModule({
  exports: [
    SortCartPipe,
    ClientNamePipe
  ],
  declarations: [
    SortCartPipe,
    ClientNamePipe
  ],
  imports: [
    CommonModule
  ],
})
export class CoreModule { }
