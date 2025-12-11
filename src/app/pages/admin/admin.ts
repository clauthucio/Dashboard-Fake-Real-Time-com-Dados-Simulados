import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonLogout } from '@core/components/button-logout/button-logout';

@Component({
  selector: 'app-admin',
  imports: [ButtonLogout, RouterOutlet, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
