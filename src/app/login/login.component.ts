import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}



  // Método que maneja el login
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        console.log('Login exitoso', res);
        // Aquí puedes almacenar el token o redirigir
      },
      error: err => {
        console.error('Error en login', err);
        alert('Credenciales incorrectas');
      }
    });
  }
  navigateToRegister() {
    this.router.navigate(['/registro']);
  }

}
