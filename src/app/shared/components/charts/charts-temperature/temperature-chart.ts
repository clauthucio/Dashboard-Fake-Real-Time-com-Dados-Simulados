import { Component, Input} from '@angular/core';
import { ZardCardComponent } from "@shared/components/ui/card/card.component";

import { NgxGaugeModule } from "ngx-gauge";

@Component({
  selector: 'app-temperature-chart',
  imports: [ZardCardComponent, NgxGaugeModule],
  templateUrl: './temperature-chart.html',
  styleUrl: './temperature-chart.css',
})
export class TemperatureChart {
  @Input() temperatura!: number;
  @Input() name!: string;
  @Input() sector!: string;



  thresholdConfig = {
    // 🟢 Verde (frio)
    '0': { color: '#00C853' },
    '10': { color: '#2ECC71' },
    '20': { color: '#66BB6A' },
    '30': { color: '#9CCC65' },

    // 🟡 Amarelo (normal)
    '40': { color: '#FFD600' },
    '50': { color: '#FFCA28' },
    '60': { color: '#FFB300' },

    // 🟠 Laranja (alerta)
    '70': { color: '#FF8F00' },
    '75': { color: '#FF6F00' },

    // 🔴 Vermelho (crítico)
    '80': { color: '#F4511E' },
    '90': { color: '#E53935' },
    '100': { color: '#D50000' },
  };
}
