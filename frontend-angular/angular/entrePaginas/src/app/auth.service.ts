// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    return user !== null;
  }

  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    sessionStorage.removeItem('user');
  }
}
