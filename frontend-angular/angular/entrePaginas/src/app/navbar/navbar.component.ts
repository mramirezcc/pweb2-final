import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Cambia a styleUrls
})
export class NavbarComponent {
  @Input() registered: boolean = false; 
  @Input() username: string = 'default';

  @Output() toggleAdvancedSearch = new EventEmitter<void>();
  @Output() openCart = new EventEmitter<void>();

  constructor(private router: Router) {} // Inyecta el Router

  isRegistered(): boolean {
    return this.registered;
  }

  openAdvanceSearch(): void {
    console.log("emitiendo busqueda avanzada")
    this.toggleAdvancedSearch.emit();
  }

  redirectShoppingCar(): void {
    console.log("Validado si es usuario o no, y luego abrir la nueva pagina web");
    if (this.isRegistered()) {
      this.router.navigate(['/shoppingCart']); // Usa el enrutador Angular para redirigir
    } else {
      alert("No está registrado!");
    }
  }

  redirectUserMain(): void {
    if (this.isRegistered()) {
      this.router.navigate(['/user']); // Usa el enrutador Angular para redirigir
    } else {
      alert("No está registrado!");
    }
  }

  redirectLogin(): void {
    this.router.navigate(['/loginUser']); // Redirige a la página de login
  }

  redirectRegister(): void {
    this.router.navigate(['/registerUser']); // Redirige a la página de registro
  }
}
