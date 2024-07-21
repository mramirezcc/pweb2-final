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

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      const user: User = {
        portrait: '',
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        number: form.value.phone,
        address: form.value.address
      };

      this.api.addUser(user, this.selectedFile).subscribe(success => {
        
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

  atras() {
    this.router.navigate(['/']);
  }
}
