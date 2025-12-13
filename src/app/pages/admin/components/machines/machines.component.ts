import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Machine } from '@core/types';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { delay, finalize } from 'rxjs/operators';
import { Api } from '@core/services/api.service';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './machines.component.html',
})
export class MachinesComponent implements OnInit {
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  machines: Machine[] = [];
  selectedMachine: Machine | null = null;
  showModal = false;
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.isLoading = true;
    this.errorMessage = null;
    this.cdr.markForCheck();
    console.log('Fetching machines...');

    this.api
      .getMachines()
      .pipe(
        delay(500), // Ensures loading skeleton is visible for at least 500ms
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Machines loaded:', data);
          this.machines = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error loading machines:', err);
          this.errorMessage = 'Erro ao carregar máquinas. Tente novamente.';
          this.cdr.markForCheck();
        },
      });
  }

  openDetails(machine: Machine) {
    this.selectedMachine = machine;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedMachine = null;
  }
}
