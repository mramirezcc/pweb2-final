import { Component } from '@angular/core';

@Component({
  selector: 'app-vendedor-main',
  templateUrl: './vendedor-main.component.html',
  styleUrl: './vendedor-main.component.css'
})
export class VendedorMainComponent {
  activeMenu: string = 'overview';

  menuChange(menu: string) {
    this.activeMenu = menu;
    console.log("Menu activo: " + this.activeMenu);
  }
}
