import { Component, computed, inject } from '@angular/core';
import { ButtonLogout } from "@shared/components/button-logout/button-logout";
import { ZardButtonComponent } from "@shared/components/ui/button/button.component";
import { ZardIconComponent } from "@shared/components/ui/icon/icon.component";
import { HeaderComponent } from "@shared/components/ui/layout/header.component";
import { TemperatureChart } from "@shared/components/charts/charts-temperature/temperature-chart";
import { Api } from '@core/services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-operador',
  imports: [
    ButtonLogout,
    ZardButtonComponent,
    ZardIconComponent,
    HeaderComponent,
    TemperatureChart,
  ],
  templateUrl: './operador.html',
  styleUrl: './operador.css',
})
export class Operador {
  private ApiService = inject(Api);

  machines = toSignal(this.ApiService.getMachines(), { initialValue: [] });

  data = computed(() =>
    this.machines().map((machine) => ({
      name: machine.nome.split(' ')[1],
      sector: machine.setor,
      temperature: Number(machine.kpisAtuais.temperatura),
    }))
  );
}
