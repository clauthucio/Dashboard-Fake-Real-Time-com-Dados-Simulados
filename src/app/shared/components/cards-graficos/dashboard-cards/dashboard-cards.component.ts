import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [CommonModule, ZardIconComponent],
  templateUrl: './dashboard-cards.component.html',
})
export class DashboardCardsComponent {
  @Input() data: any;
}
