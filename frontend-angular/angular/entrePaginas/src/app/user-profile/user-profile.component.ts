import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';

  onCartClick() {
    console.log('Ver el carrito de compras');
  }

  onPrintClick() {
    console.log('Imprimir contenido');
  }

  onDeleteClick() {
    console.log('Eliminar');
  }

  onLogoutClick() {
    console.log('Cerrar sesión');
  }
}
