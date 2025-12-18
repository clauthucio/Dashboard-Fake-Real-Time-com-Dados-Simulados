import { Component, Input } from '@angular/core';
import { LayoutComponent } from '@shared/components/ui/layout/layout.component';
import { ContentComponent } from '@shared/components/ui/layout/content.component';
import { FooterComponent } from '@shared/components/ui/layout/footer.component';
import { HeaderComponent } from '@shared/components/ui/layout/header.component';
import { ZardButtonComponent } from '@shared/components/ui/button/button.component';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';

import { LayoutModule } from '@shared/components/ui/layout/layout.module';
// import { ZardSkeletonComponent } from "@shared/components/ui/skeleton/skeleton.component";
import { MenuLayout } from '@core/types';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonLogout } from '@shared/components/button-logout/button-logout';
import { Api } from '@core/services/api.service';
import { inject, signal } from '@angular/core';
import { interval, map, startWith, switchMap } from 'rxjs';
import { Machine } from '@core/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    LayoutComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    ZardButtonComponent,
    ZardIconComponent,
    ButtonLogout,
    LayoutModule,
    // ZardSkeletonComponent,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  @Input() menu: MenuLayout[] = {} as MenuLayout[];
  year = new Date().getFullYear();

  private api = inject(Api);

  alerts = signal<Machine[]>([]);
  showNotifications = signal(false);

  // Poll for alerts every 10 seconds
  alerts$ = interval(10000)
    .pipe(
      startWith(0),
      switchMap(() => this.api.getMachines()),
      map((machines) => {
        const alerts = machines.filter(
          (m) =>
            (m.alerta?.nivel === 'amarelo' || m.alerta?.nivel === 'vermelho') &&
            m.status !== 'offline' // Optional: Ignore offline if desired, but user said "alerts"
        );
        this.alerts.set(alerts);
        return alerts;
      })
    )
    .subscribe();

  toggleNotifications() {
    this.showNotifications.update((v) => !v);
  }

  get alertCount() {
    return this.alerts().length;
  }
}
