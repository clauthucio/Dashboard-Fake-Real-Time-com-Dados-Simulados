import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'

export const RoleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  const roles = route.data?.['roles'] as string[]

  if (!auth.isLogged()) {
    router.navigate(['/login'])
    return false
  }

  if (!roles || !auth.hasRole(roles)) {
    router.navigate(['/acesso-negado'])
    return false
  }

  return true
}
