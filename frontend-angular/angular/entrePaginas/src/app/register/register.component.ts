import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { ApiService } from '../api.service';
import { User } from '../user.model'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private router: Router, private api: ApiService) {} // Inyecta el Router



  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);

      //Investigar en todos los usuarios y ver que no haya repetidos en correo

      this.api.addUser(form.value).subscribe(success => {
        if (success) {
          console.log('User added successfully');
        } else {
          console.log('User addition failed');
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
