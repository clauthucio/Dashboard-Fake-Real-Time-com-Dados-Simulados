import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginPayload, LoginResponse, User } from '@core/types';
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

  // User
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user`, user);
  }

  updateUser(id: string | number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/${id}`, user);
  }

  deleteUser(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/${id}`);
  }

  // Sectors
  getSectors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auth/sectors`);
  }

  createSector(sector: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/sectors`, sector);
  }

  updateSector(id: number, sector: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/auth/sectors/${id}`, sector);
  }

  deleteSector(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/auth/sectors/${id}`);
  }

  // Config
  getConfig(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/simulation/config`);
  }

  updateConfig(config: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/auth/simulation/config`, config);
  }
}
