import { Component, Input } from '@angular/core';
import { ZardCardComponent } from '@shared/components/ui/card/card.component';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

export interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-vertical-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, ZardCardComponent],
  templateUrl: './vertical-bar-chart.html',
  styleUrl: './vertical-bar-chart.css',
})
export class VerticalBarChart {
  /** 📊 Dados do gráfico */
  @Input({ required: true }) dados!: BarChartData[];

  /** 🏷️ Label lateral esquerda */
  @Input() legendaEsquerda = '';

  /** 📐 Tamanho */
  @Input() view: [number, number] = [400, 400];

  /** ⚙️ Opções */
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showLegend = false;
  @Input() showXAxisLabel = false;
  @Input() showYAxisLabel = true;

  @Input() xAxisLabel = '';
  @Input() yAxisLabel = '';

  @Input() gradient = false;

  /** 🎨 Cores (Tailwind / CSS vars) */
  @Input() colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['var(--primary)'],
  };

  onSelect(event: unknown) {
    console.log('Item selecionado:', event);
  }
}
