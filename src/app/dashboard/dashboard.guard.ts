import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs';

export const dashboardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  return authService.validateToken().pipe(
    tap((valid) => {
      if (!valid) {
        router.navigate(['/auth/login']);
      }
    })
  )
};

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);



  if (localStorage.getItem('role') == 'admin') {
    return true;
  }


  router.navigate(['/dashboard/home']);


  return false;
};
