import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Machine } from '@core/types';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';

@Component({
  selector: 'app-machine-bar-charts',
  standalone: true,
  imports: [CommonModule, ZardIconComponent],
  templateUrl: './machine-bar-charts.component.html',
})
export class MachineBarChartsComponent {
  machines = input<Machine[]>([]);

  // Chart 1: Production (Blue)
  productionData = computed(() => {
    const data = this.machines().map((m) => {
      // Fallback: If 'producao' is 0, sum the parts ourselves
      const total =
        m.kpisAtuais.producao > 0
          ? m.kpisAtuais.producao
          : m.kpisAtuais.pecasBoas + m.kpisAtuais.pecasRuins;

      return {
        label: m.nome,
        value: total,
      };
    });

    console.log('Production Chart Data:', data);

    // Find max for scaling
    const max = Math.max(...data.map((d) => d.value), 1);

    return data.map((d) => ({
      ...d,
      heightPercent: (d.value / max) * 100,
    }));
  });

  // Chart 2: Efficiency (Green) - (Pecās Boas / Total) * 100
  efficiencyData = computed(() => {
    const data = this.machines().map((m) => {
      const total = m.kpisAtuais.pecasBoas + m.kpisAtuais.pecasRuins;
      const efficiency = total > 0 ? (m.kpisAtuais.pecasBoas / total) * 100 : 0;
      return {
        label: m.nome,
        value: efficiency,
      };
    });

    // Scale 0-100 fixed for efficiency
    return data.map((d) => ({
      ...d,
      heightPercent: d.value, // Already 0-100
    }));
  });
}
