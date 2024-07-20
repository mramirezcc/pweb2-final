import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterComponent } from './loginregister/loginregister.component';
import { AddSpoComponent } from './add-spo/add-spo.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { BookBoxv1Component } from './book-boxv1/book-boxv1.component';
import { BookBoxv2Component } from './book-boxv2/book-boxv2.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ComprasHistorialComponent } from './compras-historial/compras-historial.component';
import { FavoriteUserComponent } from './favorite-user/favorite-user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CarShopComponent } from './car-shop/car-shop.component';
import { ComprasGraficoComponent } from './compras-grafico/compras-grafico.component';
import { VendedorLoginComponent } from './vendedor-login/vendedor-login.component';
import { VendedorNavbarComponent } from './vendedor-navbar/vendedor-navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    AddSpoComponent,
    AdvancedSearchComponent,
    BookBoxv1Component,
    BookBoxv2Component,
    BookDetailsComponent,
    UserProfileComponent,
    PersonalInfoComponent,
    ComprasHistorialComponent,
    FavoriteUserComponent,
    EditProfileComponent,
    CarShopComponent,
    ComprasGraficoComponent,
    VendedorLoginComponent,
    VendedorNavbarComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
