import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { RedirectGuard } from '@core/guards/redirect.guard';
import { RoleGuard } from '@core/guards/role.guard';
import { AcessoNegado } from '@pages/acesso-negado/acesso-negado';
import { Admin } from '@pages/admin/admin';
import { Login } from '@pages/login/login';
import { Operador } from '@pages/operador/operador';
import { Supervisor } from '@pages/supervisor/supervisor';

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
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin/components/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'machines',
        loadComponent: () =>
          import('./pages/admin/components/machines/machines.component').then(
            (m) => m.MachinesComponent
          ),
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
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
