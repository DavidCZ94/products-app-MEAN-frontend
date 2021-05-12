import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

import { ProductSelectionComponent } from './components/product-selection/product-selection.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ClientSelectionComponent } from './components/client-selection/client-selection.component';

const routes: Routes = [
  {
    path: 'products-selection',
    component: ProductSelectionComponent
  },
  {
    path: 'client-selection',
    component: ClientSelectionComponent
  },
  {
    path: 'orders-table',
    component: OrdersComponent
  },
  {
    path: ':id',
    component: OrderDetailComponent
  },
  {
    path: '**',
    redirectTo: '/admin/orders/orders-table',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
