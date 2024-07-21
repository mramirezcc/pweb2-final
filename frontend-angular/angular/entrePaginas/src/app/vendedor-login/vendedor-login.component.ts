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

  emailVendedor = "waos"
  passwordVendedor = "123";
  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember me:', this.remember);
    //funcion para verificar
    if(this.emailVendedor == this.email && this.passwordVendedor == this.password){
      alert("Ingresando");
      window.location.href  = "/vendedor";
    }else{
      alert("Incorrecto!");
    }

  }
  back(){
    window.location.href = '/'; 
  }
}
