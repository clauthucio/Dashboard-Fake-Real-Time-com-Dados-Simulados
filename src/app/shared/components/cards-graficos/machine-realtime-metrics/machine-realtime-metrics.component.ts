import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Machine } from '@core/types';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';

@Component({
  selector: 'app-machine-realtime-metrics',
  standalone: true,
  imports: [CommonModule, ZardIconComponent],
  templateUrl: './machine-realtime-metrics.component.html',
})
export class MachineRealtimeMetricsComponent {
  machines = input<Machine[]>([]);

  // Prepare data for the view
  metrics = computed(() => {
    return this.machines().map((m) => {
      // Extract history for sparklines
      const tempHistory = m.historico.map((h) => h.temperatura).slice(-10); // Last 10 points
      const vibrationHistory = m.historico.map((h) => Math.random() * 10); // Mock vibration history as API lacks it in history points

      return {
        id: m.id,
        name: m.nome,
        status: m.status,
        health: m.alerta?.nivel || 'verde',
        alertMessage: m.alerta?.mensagem,
        temp: m.kpisAtuais.temperatura,
        consumption: m.kpisAtuais.consumoEnergia,
        vibration: m.kpisAtuais.vibracao,
        pressure: m.kpisAtuais.pressao,
      };
    });
  });
}
