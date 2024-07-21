import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {} // Inyecta el Router

  onSubmit(form: NgForm) {
    console.log('Form Data:', form.value);
  }
  atras(){
    this.router.navigate(['/']); 

  }
}
