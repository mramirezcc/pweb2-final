import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { ApiService } from '../api.service';
import { User } from '../user.model';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private api: ApiService) {} // Inyecta el Router

  onSubmit(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      console.log("username: ", username, "- password: ", password)
      this.api.loginUser(username, password).subscribe(user => {
        if (user) {
          console.log('User logged in:', user);
          // Aquí puedes manejar la redirección o almacenamiento de datos del usuario
        } else {
          console.log('Login failed');
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
