import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  selectedFile: File | null = null;


  constructor(private router: Router, private api: ApiService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  userCreate: User | undefined

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      
      const user: User = {
        id:-1,
        portrait: '',
        username: form.value.name,
        email: form.value.email,
        password: form.value.password,
        number: form.value.phone,
        address: form.value.address
      };


      this.api.addUser(user, this.selectedFile).subscribe(success => {

        if (success) {
          console.log('User added successfully' + user);
          this.userCreate = user;
          alert("Usuario creado correctamente, inicie sesion con sus credenciales");
          this.router.navigate(['/']);

        } else {
          console.log('User addition failed');
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
