import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginPayload, LoginResponse } from '@core/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://api-notry-vision.onrender.com';
  private http = inject(HttpClient);

  // Auth
  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, payload);
  }

  // Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/users/${id}`);
  }

  // Sectors
  getSectors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/sectors`);
  }

  createSector(sector: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/sectors`, sector);
  }

  updateSector(id: number, sector: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/sectors/${id}`, sector);
  }

  deleteSector(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/sectors/${id}`);
  }

  // Config
  getConfig(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/simulation/config`);
  }

  updateConfig(config: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/simulation/config`, config);
  }
}
