import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private api: ApiService) {}

  user: User = {
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: '',
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      console.log("username: ", username, "- password: ", password);
      this.api.loginUser(username, password).subscribe(user => {
        if (user) {
          this.user = user;
          console.log('User logged in:', user);
          alert("Usuario logueado correctamente");
          sessionStorage.setItem('user', JSON.stringify(this.user));  // Guardar en sessionStorage
          this.router.navigate(['/user']);
        } else {
          console.log('Login failed');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  atras() {
    this.router.navigate(['/']);
  }
}
