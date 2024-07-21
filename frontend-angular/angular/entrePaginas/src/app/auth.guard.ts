import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // Asegúrate de importar correctamente

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private navbarComponent: NavbarComponent) {}

  canActivate(): boolean {
    // Aquí puedes implementar tu lógica de autenticación
    const isAuthenticated = this.checkIfAuthenticated();

    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redirigir a una página de inicio de sesión u otra página
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }

  private checkIfAuthenticated(): boolean {
    // Aquí implementas tu lógica de verificación de autenticación
    // Por ejemplo, puedes verificar si hay un token en localStorage
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true si el token existe, false si no
  }
}
