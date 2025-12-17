import { Component, computed, Input } from '@angular/core';

import { ZardCardComponent } from '@shared/components/ui/card/card.component';


@Component({
  selector: 'app-temperature-chart',
  imports: [ZardCardComponent],
  templateUrl: './temperature-chart.html',
  styleUrl: './temperature-chart.css',
})
export class TemperatureChart {
  @Input({ required: true }) value!: number;
  @Input() min = 0;
  @Input() max = 100;
  @Input() unit = '°C';
  @Input() label = 'Temperatura';

  private readonly WARNING = 60;
  private readonly CRITICAL = 70;

  /** Normalização */
  percentage = computed(() =>
    Math.min(100, Math.max(0, ((this.value - this.min) / (this.max - this.min)) * 100))
  );

  /** Ângulo do ponteiro (-120° → 120°) */
  angle = computed(() => -120 + (this.percentage() * 240) / 100);

  /** Cor por status */
  status = computed(() => {
    if (this.value >= this.CRITICAL) return 'critical';
    if (this.value >= this.WARNING && this.value < this.CRITICAL) return 'warning';
    return 'normal';
  });

  color = computed(() => {
    switch (this.status()) {
      case 'critical':
        return '#dc2626'; // red-600
      case 'warning':
        return '#f0b100'; // yellow-400
      default:
        return '#16a34a'; // green-600
    }
  });
}
