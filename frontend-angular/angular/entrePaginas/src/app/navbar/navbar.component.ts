import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
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
  redirectShoppingCar(): void{
    console.log("Validado si es usuario o no, y luego abrir la nueva pagina web")
    if(this.registered){
      window.location.href = '/shoppingCart'; // Usa window.location.href para redirigir
    }else{
      alert("No esta registrado!");
    }
  }

  redirectUserMain(): void{
    if(this.registered){
      window.location.href = '/user'; 
    }else{
      alert("No esta registrado!");
    }
  }
}
