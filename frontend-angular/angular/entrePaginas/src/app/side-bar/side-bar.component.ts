import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  activeMenu: string = 'overview';

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
    console.log(`Menu seleccionado: ${menu}`);
  }

  logout() {
    console.log('Cerrar sesión');
    // Lógica de cierre de sesión aquí
  }
}
