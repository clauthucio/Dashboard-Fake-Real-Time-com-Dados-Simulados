import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})

export class AcessoNegado {
  private authService = inject(AuthService);
  usuario = this.authService.getUser()?.name || 'Desconhecido';
  username = this.authService.getUser()?.username || 'Desconhecido';
  cargo = this.authService.getUser()?.cargo || 'Desconhecido';
}
