import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingInComponent } from './components/sing-in/sing-in.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';

const routes: Routes = [
  {
    path: 'sing-in',
    component: SingInComponent
  },
  {
    path: 'sing-up',
    component: SingUpComponent
  },
  {
    path: '**',
    redirectTo: '/sing-in',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
