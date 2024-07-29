import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() menuChange = new EventEmitter<string>();
  activeMenu: string = 'overview';

  setActiveMenu(menu: string) {
    this.menuChange.emit(menu);
    this.activeMenu = menu;

    console.log(`Menu seleccionado: ${menu}`);
  }

  logout() {
    console.log('Cerrar sesión');
    sessionStorage.removeItem('vendedorToken');
    window.location.href = '/';
  }
}


