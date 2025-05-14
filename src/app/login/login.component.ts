import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }  
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { correo, password } = this.loginForm.value;

    this.authService.login(correo, password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        const decoded = this.authService.decodeToken(response.token);
        const rol = decoded?.rol;
        //this.snackBar.open(`Bienvenido, ${decoded?.sub}! Rol: ${decoded?.rol}`, 'Cerrar', {
        this.snackBar.open(`Bienvenido, ${decoded?.sub}!`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        // Redirigir según el rol
        if (rol === 'administrador') {
          this.router.navigate(['/admin']);
        } else if(rol ==='cliente'){
          this.router.navigate(['/usuario']);
        }
        else {
          this.snackBar.open('Rol no reconocido', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }

        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open('Error en el login. Verifica tus credenciales.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }
}
