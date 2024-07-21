import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() user: User = {
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  };

  editedUser: User = {
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  };

  ngOnInit(): void {
    // Crea una copia del usuario para editar
    this.editedUser = { ...this.user };
  }

  onSave() {
    // Guarda los cambios y actualiza el usuario original
    Object.assign(this.user, this.editedUser);
    console.log(this.user);
    window.location.href = '/user';
  }

  onCancel() {
    // Cancela la edición y vuelve al perfil sin guardar cambios
    window.location.href = '/user';
  }

  onDelete() {
    // Lógica para eliminar el perfil
    window.location.href = '/';
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedUser.portrait = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
