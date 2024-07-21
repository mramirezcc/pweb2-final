import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) {} // Inyecta el Router

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);
    } else {
      console.log('Form is invalid');
    }
  }
  atras(){
    this.router.navigate(['/']); 

  }
}
