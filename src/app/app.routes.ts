import { Routes } from '@angular/router';
import { RedirectGuard } from '../auth/redirect.guard';
import { Login } from '../pages/login/login';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Admin } from '../pages/admin/admin';
import { Supervisor } from '../pages/supervisor/supervisor';
import { Operador } from '../pages/operador/operador';
import { AcessoNegado } from '../pages/acesso-negado/acesso-negado';

export const routes: Routes = [
  // LOGIN
  {
    path: 'login',
    canActivate: [RedirectGuard],
    component: Login,
  },

  // ADMIN
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    component: Admin,
  },

  // SUPERVISOR
  {
    path: 'supervisor',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['supervisor', 'admin'] },
    component: Supervisor,
  },

  // OPERADOR
  {
    path: 'operador',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['operador', 'supervisor', 'admin'] },
    component: Operador,
  },

  // ACESSO NEGADO
  {
    path: 'acesso-negado',
    component: AcessoNegado,
  },

  // ROOT
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 404
  { path: '**', redirectTo: 'login' },
];
