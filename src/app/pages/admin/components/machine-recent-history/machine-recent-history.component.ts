import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Machine } from '@core/types';

interface HistoryItem {
  machineName: string;
  id: string;
  time: string;
  output: number;
  temp: number;
  consumption: number;
}

@Component({
  selector: 'app-machine-recent-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './machine-recent-history.component.html',
})
export class MachineRecentHistoryComponent {
  machines = input<Machine[]>([]);

  // Pagination
  currentPage = signal(1);
  itemsPerPage = 10;

  // Flatten all machines history into a single list sorted by time
  recentHistory = computed(() => {
    const allHistory: HistoryItem[] = [];

    this.machines().forEach((m) => {
      if (m.historico) {
        m.historico.forEach((h) => {
          allHistory.push({
            machineName: m.nome,
            id: m.id,
            time: h.hora,
            output: h.producao,
            temp: h.temperatura,
            consumption: h.consumoEnergia,
          });
        });
      }
    });

    // Sort by time descending (newest first)
    return allHistory.sort((a, b) => {
      // Assuming HH:MM:SS format for 'hora', string comparison works for same-day
      return b.time.localeCompare(a.time);
    });
  });

  paginatedHistory = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.recentHistory().slice(start, end);
  });

  totalPages = computed(() => Math.ceil(this.recentHistory().length / this.itemsPerPage));

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }
}
