import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vendedor-navbar',
  templateUrl: './vendedor-navbar.component.html',
  styleUrl: './vendedor-navbar.component.css'
})
export class VendedorNavbarComponent {
  @Input() sellerName: string = 'Nombre del Vendedor';
}
