import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '@shared/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ZardButtonComponent } from '@shared/components/ui/button/button.component';
import { ZardCardComponent } from '@shared/components/ui/card/card.component';
import { generateId } from '@shared/utils/merge-classes';
import { FormsModule } from '@angular/forms';
import { LoginResponse } from '@core/types';

@Component({
  selector: 'app-login',
  imports: [ZardButtonComponent, ZardCardComponent, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isclicked = signal<boolean>(false);
  showError = signal<boolean>(false);

  private auth = inject(AuthService);
  private router = inject(Router);
  private ApiService = inject(Api);

  protected readonly idEmail = generateId('usuario');
  protected readonly idPassword = generateId('password');

  // Signals para armazenar os valores digitados
  user = signal('');
  password = signal('');

  loginAuth() {
    if (this.isclicked()) return;

    this.isclicked.set(true); //desabilita o botao

    const credentials = {
      username: this.user(),
      password: this.password(),
    };

    this.ApiService.login(credentials).subscribe({
      next: (response: LoginResponse) => {
        // console.log('Login OK:', response)

        this.auth.login({
          id: response.id || 123456,
          username: credentials.username,
          name: response.name || 'Nome do Usuario',
          cargo: response.cargo,
        });

        this.isclicked.set(false); //habilita o botao
        this.router.navigate(['/' + response.cargo]);
        // this.auth.login(response)
        // this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        // console.log('Erro de login kakakakk', error.status);
        if (error.status == 401) {
          this.showError.set(true);
        }
        this.isclicked.set(false);
      },
    });
  }
}
