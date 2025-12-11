import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '@core/services/config.service';
import { SimulationConfig } from '@core/types';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit {
  private configService = inject(ConfigService);
  config: SimulationConfig = { intervalMs: 1000, kpiLimit: 80, historyWindowSize: 50 };

  ngOnInit() {
    this.configService.getConfig().subscribe((c) => {
      this.config = { ...c };
    });
  }

  save() {
    this.configService.updateConfig(this.config);
    alert('Configurações salvas!');
  }
}
