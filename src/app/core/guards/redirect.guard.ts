import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const RedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogged()) {
    const user = auth.getUser();

    if (user?.cargo === 'admin') router.navigate(['/admin']);
    else if (user?.cargo === 'supervisor') router.navigate(['/supervisor']);
    else router.navigate(['/operador']);

    return false;
  }

  return true;
};
