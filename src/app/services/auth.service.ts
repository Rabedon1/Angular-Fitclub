// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // URL base del backend Spring Boot

  constructor(private http: HttpClient) {}

  // Método de login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correo: email, password });
  }

  // Método de registro
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
