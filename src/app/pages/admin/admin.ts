import { Component } from '@angular/core';
import { MenuLayout } from '@core/types';
import { Layout } from '@shared/components/layout/layout';

@Component({
  selector: 'app-admin',
  imports: [Layout],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  menu: MenuLayout[] = [
    {
      label: 'Dashboard',
      icon: 'house',
      path: '/admin',
    },
    { label: 'Usuários', icon: 'users', path: '/admin/users' },
    { label: 'Máquinas', icon: 'factory', path: '/admin/machines' },
    {
      label: 'Setores',
      icon: 'factory',
      path: '/admin/sectors',
    },
    {
      label: 'Operadores',
      icon: 'users',
      path: '/admin/operadores',
    },
    {
      label: 'Relatórios',
      icon: 'file-text',
      path: '/admin/relatorios',
    },
    {
      label: 'Configurações',
      icon: 'settings',
      path: '/admin/configuracoes',
    },
  ];
}
