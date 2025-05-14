import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  usuario: any = {
    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    contrasena: '',
    edad: null,
    telefono: '',
    fechaNacimiento: '',
    fechaIngreso: new Date().toISOString().split('T')[0], // Fecha actual
    rol: {
      idRol: 2 // Usuario por defecto
    }
  };


  constructor( private router: Router, private authService: AuthService,) {}

  registrar() {
  this.authService.register(this.usuario).subscribe({
    next: (res) => {
      alert('¡Registro exitoso!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert('Ocurrió un error al registrarse.');
      console.error(err);
    }
  });
}
}
