import { inject, Injectable } from '@angular/core';
import { SimulationConfig } from '@core/types';
import { Api } from '@shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private api = inject(Api);

  getConfig(): Observable<SimulationConfig> {
    return this.api.getConfig();
  }

  updateConfig(newConfig: Partial<SimulationConfig>): Observable<SimulationConfig> {
    return this.api.updateConfig(newConfig);
  }
}
