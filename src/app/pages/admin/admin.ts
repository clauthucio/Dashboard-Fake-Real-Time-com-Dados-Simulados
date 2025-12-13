import { Component } from '@angular/core';
import { MenuLayout } from '@core/types';
import { Layout } from '@core/components/layout/layout';

@Component({
  selector: 'app-admin',
  imports: [Layout],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  menu: MenuLayout[] = [
    { label: 'Usuários', icon: 'users', path: '/admin/users' },
    { label: 'Máquinas', icon: 'factory', path: '/admin/machines' },
  ];
}
