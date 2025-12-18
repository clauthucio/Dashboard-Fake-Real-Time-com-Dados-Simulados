import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginPayload, LoginResponse, User, Machine } from '@core/types';
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

  getUserById(id: string | number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
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

  // Sector
  getSectors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sector`);
  }

  createSector(sector: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sector`, sector);
  }

  updateSector(id: string | number, sector: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/sector/${id}`, sector);
  }

  deleteSector(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/sector/${id}`);
  }

  getSectorById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sector/${id}`);
  }

  // Machines
  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.baseUrl}/machines`);
  }
}
