import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {catchError, map, of} from 'rxjs';

export const nodeSessionGuard: CanActivateFn = (route, state) => {
  const nodeAuth = inject(AuthService)
  const router = inject(Router)

  const email = localStorage.getItem('loginEmail');
  if (!email) {
    router.navigate(['/login']);
    return of(false);
  }

  return nodeAuth.ensureSession(email).pipe(
    map(() => true),
    catchError(() => {
      console.error('❌ Session NodeJS échouée');
      return of(false);
    })
  );
};
