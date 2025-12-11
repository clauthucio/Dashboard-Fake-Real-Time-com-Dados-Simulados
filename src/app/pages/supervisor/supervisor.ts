
import { Component } from '@angular/core';
import { Layout } from "@core/components/layout/layout";
import { MenuLayout } from '@core/types';


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
      path: '/dashboard',
    },
    {
      label: 'Setores',
      icon: 'factory',
      path: '/sectors',
    },
    {
      label: 'Operadores',
      icon: 'users',
      path: '/operadores',
    },
    {
      label: 'Relatórios',
      icon: 'file-text',
      path: '/relatorios',
    },
    {
      label: 'Configurações',
      icon: 'settings',
      path: '/configuracoes',
    },
  ];
}
