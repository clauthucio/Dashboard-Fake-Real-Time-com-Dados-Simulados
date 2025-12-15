import { Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';
import { Machine } from '@core/types';

interface ChartPoint {
  label: string;
  value: number;
}

type ViewMode = 'Semana' | 'Mês';

@Component({
  selector: 'app-production-chart',
  standalone: true,
  imports: [CommonModule, ZardIconComponent],
  templateUrl: './production-chart.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProductionChartComponent {
  machines = input<Machine[]>([]);
  viewMode = signal<ViewMode>('Mês');
  isDropdownOpen = signal(false);

  availableModes: ViewMode[] = ['Semana', 'Mês'];

  toggleDropdown() {
    this.isDropdownOpen.update((v) => !v);
  }

  setMode(mode: ViewMode) {
    this.viewMode.set(mode);
    this.isDropdownOpen.set(false);
  }

  // Real data aggregation from machines history (Hourly)
  realHourlyData = computed(() => {
    const machines = this.machines();
    if (!machines.length) return [];

    const hourlyTotals = new Map<string, number>();
    machines.forEach((machine) => {
      if (machine.historico) {
        machine.historico.forEach((point) => {
          const current = hourlyTotals.get(point.hora) || 0;
          hourlyTotals.set(point.hora, current + point.producao);
        });
      }
    });

    return Array.from(hourlyTotals.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  totalProduction = computed(() => {
    // Always calculate total based on the Real Hourly data to keep the counter accurate to "Today"
    return this.realHourlyData().reduce((acc, curr) => acc + curr.value, 0);
  });

  chartData = computed(() => {
    const mode = this.viewMode();
    const realData = this.realHourlyData();

    // Generate Projected Data for Week/Month based on Real Average
    const validValues = realData.map((d) => d.value).filter((v) => v > 0);
    const avgProduction =
      validValues.length > 0 ? validValues.reduce((a, b) => a + b, 0) / validValues.length : 1000; // Fallback

    // Scale up for daily/weekly totals (assuming hourly avg * 8 operational hours)
    const dailyBase = avgProduction * 8;

    if (mode === 'Semana') {
      const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      return days.map((day) => ({
        label: day,
        value: Math.max(0, dailyBase + (Math.random() * dailyBase * 0.4 - dailyBase * 0.2)), // +/- 20% variation
      }));
    }

    if (mode === 'Mês') {
      // Generate 4 weeks labels
      return [
        { label: 'Sem 1', value: dailyBase * 5 * (0.9 + Math.random() * 0.2) },
        { label: 'Sem 2', value: dailyBase * 5 * (0.9 + Math.random() * 0.2) },
        { label: 'Sem 3', value: dailyBase * 5 * (0.9 + Math.random() * 0.2) },
        { label: 'Sem 4', value: dailyBase * 5 * (0.9 + Math.random() * 0.2) },
      ];
    }

    return [];
  });

  // Chart Dimensions
  height = 300;
  width = 800;
  padding = 40;

  points = computed(() => {
    const data = this.chartData();
    if (data.length === 0) return [];

    const maxVal = Math.max(...data.map((d) => d.value)) * 1.1 || 100;
    const minVal = 0;

    const xStep = data.length > 1 ? (this.width - this.padding * 2) / (data.length - 1) : 0;

    return data.map((d, i) => {
      const x = this.padding + i * xStep + (data.length === 1 ? this.width / 2 - this.padding : 0);
      const y =
        this.height -
        this.padding -
        ((d.value - minVal) / (maxVal - minVal)) * (this.height - this.padding * 2);
      return { x, y, ...d };
    });
  });

  areaPath = computed(() => {
    const points = this.points();
    if (points.length < 2) return '';

    let d = this.pathD();
    d += ` L ${points[points.length - 1].x} ${this.height - this.padding}`; // Bottom Right
    d += ` L ${points[0].x} ${this.height - this.padding}`; // Bottom Left
    d += ' Z';

    return d;
  });

  pathD = computed(() => {
    const points = this.points();
    if (points.length === 0) return '';
    if (points.length === 1) {
      return `M ${points[0].x - 10} ${points[0].y} L ${points[0].x + 10} ${points[0].y}`;
    }

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      const cp1x = p0.x + (p1.x - p0.x) / 3;
      const cp1y = p0.y;
      const cp2x = p1.x - (p1.x - p0.x) / 3;
      const cp2y = p1.y;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }

    return d;
  });
}
