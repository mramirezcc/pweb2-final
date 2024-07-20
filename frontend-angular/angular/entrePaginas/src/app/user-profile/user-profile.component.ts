import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';

  redirectShoppingCar() {
    console.log('Ver el carrito de compras');
    //abrir el carrito de compras con la informacion del usuario
    window.location.href = '/shoppingCart'; 
  }

  openEditInfo() {
    console.log('Imprimir contenido');
    //funcion para generar un pdf del dashboard

  }

  deleteUser() {
  
    if (confirm("¿Estás seguro de que deseas eliminar tu usuario?")) {
      console.log('Funcion para eliminar usuario');

      window.location.href = '';
    } else {
      console.log("El usuario decidió no eliminar el usuario.");
    }
  }
  
  logout() {
    console.log('Funcion para cerrar sesion');
    window.location.href = '';

  }
}
