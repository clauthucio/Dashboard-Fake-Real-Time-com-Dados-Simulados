import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '@core/services/api.service';
import { interval, startWith, switchMap, map } from 'rxjs';
import { ProductionChartComponent } from '../../../../shared/components/cards-graficos/production-chart/production-chart.component';
import { MachineBarChartsComponent } from '../../../../shared/components/cards-graficos/machine-bar-charts/machine-bar-charts.component';
import { MachineRealtimeMetricsComponent } from '../../../../shared/components/cards-graficos/machine-realtime-metrics/machine-realtime-metrics.component';
import { MachineRecentHistoryComponent } from '../../../../shared/components/cards-graficos/machine-recent-history/machine-recent-history.component';
import { DashboardCardsComponent } from '../../../../shared/components/cards-graficos/dashboard-cards/dashboard-cards.component';
import { Machine } from '@core/types';
import { ZardSkeletonComponent } from '../../../../shared/components/ui/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProductionChartComponent,
    MachineBarChartsComponent,
    MachineRealtimeMetricsComponent,
    MachineRecentHistoryComponent,
    DashboardCardsComponent,
    ZardSkeletonComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private api = inject(Api);

  // Stream that updates every 10 seconds
  dashboardData$ = interval(10000).pipe(
    startWith(0),
    switchMap(() => this.api.getMachines()),
    map((machines: Machine[]) => {
      const totalPecasBoas = machines.reduce((acc, m) => acc + (m.kpisAtuais.pecasBoas || 0), 0);
      const totalPecasRuins = machines.reduce((acc, m) => acc + (m.kpisAtuais.pecasRuins || 0), 0);

      // Real Data: Count based on status instead of simulating hours
      const onlineCount = machines.filter((m) =>
        ['online', 'operacional'].includes(m.status)
      ).length;
      const offlineCount = machines.length - onlineCount;

      const totalPecas = totalPecasBoas + totalPecasRuins;
      const totalMachines = machines.length;

      const rateBoas = totalPecas > 0 ? (totalPecasBoas / totalPecas) * 100 : 0;
      const rateRuins = totalPecas > 0 ? (totalPecasRuins / totalPecas) * 100 : 0;
      const rateOnline = totalMachines > 0 ? (onlineCount / totalMachines) * 100 : 0;
      const rateOffline = totalMachines > 0 ? (offlineCount / totalMachines) * 100 : 0;

      return {
        pecasBoas: totalPecasBoas,
        pecasRuins: totalPecasRuins,
        onlineCount,
        offlineCount,
        rateBoas,
        rateRuins,
        rateOnline,
        rateOffline,
        machines, // Pass raw data for the chart
      };
    })
  );
}
