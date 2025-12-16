import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center h-[50vh] text-gray-500">
      <h2 class="text-2xl font-bold mb-2">Em Construção</h2>
      <p>Esta página estará disponível em breve.</p>
    </div>
  `,
})
export class PlaceholderComponent {}
