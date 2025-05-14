import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalAdministradorComponent } from './principal-administrador/principal-administrador.component';
import { PrincipalUsuarioComponent } from './principal-usuario/principal-usuario.component';
import { RegisterComponent } from './register/register.component';
//import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: PrincipalAdministradorComponent },
  { path: 'usuario', component: PrincipalUsuarioComponent },
  { path: '**', redirectTo: 'login' }
];
