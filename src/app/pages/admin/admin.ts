import { Component } from '@angular/core';
import { ButtonLogout } from "@core/components/button-logout/button-logout";

@Component({
  selector: 'app-admin',
  imports: [ButtonLogout],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}
