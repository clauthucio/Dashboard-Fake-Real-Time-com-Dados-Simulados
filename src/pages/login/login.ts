import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Api, LoginResponse } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { ZardButtonComponent } from "src/shared/components/ui/button/button.component";
import { ZardCardComponent } from "src/shared/components/ui/card/card.component";
import { generateId } from 'src/shared/utils/merge-classes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ZardButtonComponent, ZardCardComponent,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private ApiService = inject(Api);

  protected readonly idEmail = generateId('usuario');
  protected readonly idPassword = generateId('password');

  // Signals para armazenar os valores digitados
  user = signal('');
  password = signal('');

  loginAuth() {
    const credentials = {
      username: this.user(),
      password: this.password(),
    };

    this.ApiService.login(credentials).subscribe({
      next: (response: LoginResponse) => {
        // console.log('Login OK:', response)

        this.auth.login({
          id: 'number',
          username: credentials.username,
          name: response.name || 'Nome do Usuario',
          password: credentials.password,
          role: response.cargo,
        });

        this.router.navigate(['/' + response.cargo]);
        // this.auth.login(response)
        // this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        console.error('Erro de login kakakakk', error);
      },
    });
  }
}
