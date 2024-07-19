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
