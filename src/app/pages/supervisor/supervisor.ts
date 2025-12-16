import { Component } from '@angular/core';

import { MenuLayout } from '@core/types';
import { Layout } from '@shared/components/layout/layout';

@Component({
  selector: 'app-supervisor',
  imports: [Layout],
  templateUrl: './supervisor.html',
  styleUrl: './supervisor.css',
})
export class Supervisor {
  MenuLayoutFake: MenuLayout[] = [
    {
      label: 'Dashboard',
      icon: 'house',
      path: '/supervisor/dashboard',
    },
    {
      label: 'Setores',
      icon: 'factory',
      path: '/supervisor/sectors',
    },
    {
      label: 'Operadores',
      icon: 'users',
      path: '/supervisor/operadores',
    },
    {
      label: 'Relatórios',
      icon: 'file-text',
      path: '/supervisor/relatorios',
    },
    {
      label: 'Configurações',
      icon: 'settings',
      path: '/supervisor/configuracoes',
    },
  ];
}
