import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardIconComponent } from '../icon/icon.component';

export type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ZardIconComponent],
  template: `
    @if (isVisible()) {
    <div
      class="fixed font-sans bottom-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100"
      [ngClass]="{
        'bg-green-600 text-white': type === 'success',
        'bg-red-600 text-white': type === 'error',
        'bg-blue-600 text-white': type === 'info'
      }"
    >
      <z-icon
        [zType]="type === 'success' ? 'check' : type === 'error' ? 'triangle-alert' : 'info'"
        class="w-5 h-5"
      ></z-icon>
      <span class="font-medium">{{ message }}</span>
      <button (click)="close()" class="ml-2 opacity-80 hover:opacity-100 transition-opacity">
        <z-icon zType="x" class="w-4 h-4"></z-icon>
      </button>
    </div>
    }
  `,
  styles: [],
})
export class ToastComponent implements OnChanges {
  @Input() message: string = '';
  @Input() type: ToastType = 'success';
  @Input() trigger: number = 0; // Increment this to trigger the toast

  isVisible = signal(false);
  private timeoutId: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trigger'] && this.message) {
      this.show();
    }
  }

  show() {
    this.isVisible.set(true);
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.isVisible.set(false);
    }, 3000); // Auto hide after 3 seconds
  }

  close() {
    this.isVisible.set(false);
  }
}
