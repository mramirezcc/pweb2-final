import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

import { CarShopComponent } from './car-shop/car-shop.component';
const routes: Routes = [
  // Otras rutas
  { path: '', component: MainComponent },

  { path: 'shoppingCart', component: CarShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
