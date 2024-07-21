import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { ApiService } from '../api.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private api: ApiService) {} // Inyecta el Router

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const name = form.value.name;

      this.api.getUser(email, name).subscribe(user => {
        if (user) {
          console.log('User found:', user);
          alert('Usuario encontrado');

          // Aquí puedes manejar la redirección o almacenamiento de datos del usuario
        } else {
          console.log('User not found');
          alert('Usuario no encontrado');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  atras(){
    this.router.navigate(['/']); 

  }
}
