import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // Asegúrate de importar correctamente

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private navbarComponent: NavbarComponent) {}

  canActivate(): boolean {
    const isAuthenticated = this.checkIfAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }

  private checkIfAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; 
  }
}
