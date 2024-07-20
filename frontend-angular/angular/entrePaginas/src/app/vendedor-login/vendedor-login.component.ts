import { Component } from '@angular/core';

@Component({
  selector: 'app-vendedor-login',
  templateUrl: './vendedor-login.component.html',
  styleUrl: './vendedor-login.component.css'
})
export class VendedorLoginComponent{
  email: string = '';
  password: string = '';
  remember: boolean = false;

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember me:', this.remember);
  }
}
