import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  registered: boolean = true;
  username: string = 'wasds';
  
  isRegistered(): boolean {
    return this.registered;
  }
}
