import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { VendedorLoginComponent } from './vendedor-login/vendedor-login.component';
import { VendedorMainComponent } from './vendedor-main/vendedor-main.component';


import { CarShopComponent } from './car-shop/car-shop.component';
const routes: Routes = [
  { path: '', component: MainComponent },

  { path: 'shoppingCart', component: CarShopComponent },

  { path: 'user', component: UsuarioMainComponent },

  { path: 'vendedorLogin', component: VendedorLoginComponent },  

  { path: 'vendedor', component: VendedorMainComponent },  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
