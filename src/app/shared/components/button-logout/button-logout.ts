import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ZardButtonComponent } from '@shared/components/ui/button/button.component';



@Component({
  selector: 'app-button-logout',
  imports: [ZardButtonComponent],
  templateUrl: './button-logout.html',
  styleUrl: './button-logout.css',
})
export class ButtonLogout {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
