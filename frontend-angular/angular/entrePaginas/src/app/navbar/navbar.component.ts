import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() registered: boolean = false; 
  @Input() username: string = 'default';
  @Output() toggleAdvancedSearch = new EventEmitter<void>();

  
  isRegistered(): boolean {
    return this.registered;
  }
  openAdvanceSearch(): void {
    console.log("emitiendo busqueda avanzada")
    this.toggleAdvancedSearch.emit();
  }
}
