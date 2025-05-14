import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  // Lista de roles (puedes obtenerla de una API si es dinámica)
  roles = [
    { idRol: 1, nombre: 'Administrador' },
    { idRol: 2, nombre: 'Usuario' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      idRol: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.registerForm.value;
    const user = {
      rol: { idRol: formValue.idRol },
      cedula: formValue.cedula,
      nombres: formValue.nombres,
      apellidos: formValue.apellidos,
      fechaNacimiento: formValue.fechaNacimiento,
      fechaIngreso: formValue.fechaIngreso,
      edad: formValue.edad,
      correo: formValue.correo,
      telefono: formValue.telefono,
      contrasena: formValue.contrasena
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        this.snackBar.open('Registro exitoso. Por favor, inicia sesión.', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loading = false;
        this.registerForm.reset();
        // Opcional: Redirigir al login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('Error en el registro. Verifica los datos.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }
}
