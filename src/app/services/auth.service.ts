// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<{ token: string }> {
    const body = { correo, password };
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body);
  }

  register(user: {
    rol: { idRol: number };
    cedula: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    fechaIngreso: string;
    edad: number;
    correo: string;
    telefono: string;
    contrasena: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  
  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Decodificar el token para extraer información (sin verificar la firma)
  decodeToken(token: string): { sub: string; rol: string; iat: number; exp: number } | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        sub: payload.sub,
        rol: payload.rol,
        iat: payload.iat,
        exp: payload.exp
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    // Verificar si el token no ha expirado
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    const decoded = this.decodeToken(this.getToken() || '');
    return decoded ? decoded.rol : null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
