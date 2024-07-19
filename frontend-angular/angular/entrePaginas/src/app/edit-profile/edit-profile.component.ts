import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  imageUrl="/../profileImage.jpg";
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
    // Lógica para guardar el perfil
  }

  onCancel() {
    // Lógica para cancelar la edición
  }

  onDelete() {
    // Lógica para eliminar el perfil
  }
  editImage() {
    // Lógica para eliminar el perfil
  }
}
