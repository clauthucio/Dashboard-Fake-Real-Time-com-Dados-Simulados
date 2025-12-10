import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  name: string;
  cargo: 'admin' | 'supervisor' | 'operador';
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://api-notry-vision.vercel.app';
  private http = inject(HttpClient);

  // getEndpointUrl(endpoint: string): string {
  //   return `${this.baseUrl}/${endpoint}`
  // }
  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/login`, payload);
  }
}
