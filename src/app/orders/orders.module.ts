import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { ClientSelectionComponent } from './components/client-selection/client-selection.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductSelectionComponent } from './components/product-selection/product-selection.component';
import { OrderNavarComponent } from './components/order-navar/order-navar.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    OrdersComponent,
    ClientSelectionComponent,
    OrderDetailComponent,
    ProductSelectionComponent,
    OrderNavarComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class OrdersModule { }
