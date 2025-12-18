import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '@core/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user_logged';
  private router = inject(Router);

  login(user: LoginResponse) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getUser(): LoginResponse | null {
    const data = localStorage.getItem(this.userKey);
    if (!data) return null;

    const user = JSON.parse(data);
    // Validate if data has the new 'cargo' field. If not (stale data), force logout behavior by returning null.
    if (!user.cargo) {
      localStorage.removeItem(this.userKey);
      return null;
    }

    return user;
  }

  isLogged() {
    return !!this.getUser();
  }

  hasRole(roles: string[]): boolean {
    const user = this.getUser();
    if (!user) return false;
    return roles.includes(user.cargo);
  }
}
