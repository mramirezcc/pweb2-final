import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  imageUrl = "/../profileImage.jpg";
  perfil = {
    nombre: 'Gato sigma 666',
    email: 'gato@gato.com',
    address: 'casita',
    contactNumber: '666 666 666',
    pais: 'Perú',
    ciudad: 'Arequipa',
    estado: 'Arequipa',
    password: 'sbdfbnd65sfdvb s'
  };

  onSave() {
    // Lógica para guardar información
    console.log(this.perfil);
    window.location.href = '/user';
  }

  onCancel() {
    // Lógica para cancelar la edición
    window.location.href = '/user';
  }

  onDelete() {
    // Lógica para eliminar el perfil
    window.location.href = '/';
  }

  editImage() {
    // Lógica para editar imagen
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
