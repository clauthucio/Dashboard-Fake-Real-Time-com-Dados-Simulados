import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  name: string;
  password: string;
  role: 'admin' | 'supervisor' | 'operador';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user_logged';
  private router = inject(Router);

  login(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getUser(): User | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  isLogged() {
    return !!this.getUser();
  }

  hasRole(roles: string[]): boolean {
    const user = this.getUser();
    if (!user) return false;
    return roles.includes(user.role);
  }
}
