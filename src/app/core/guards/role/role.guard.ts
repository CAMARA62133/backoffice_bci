import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/authService/auth.service';
  // --- Dans RoleGuard ---
// src/app/core/guards/role.guard.ts
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
  return this.authService.checkSession().pipe(
    take(1),
    map(isLoggedIn => {
      const user = this.authService.getUserInfo();

      // SI PAS CONNECTÉ : On renvoie au login
      if (!isLoggedIn || !user) {
        this.router.navigate(['/login']);
        return false;
      }

      const userRoleID = String(user.iRoleID).trim();
      const allowedRoles = route.data['roles'] as Array<string>;

      // SI CONNECTÉ MAIS MAUVAIS RÔLE : On renvoie à unauthorized
      if (allowedRoles && !allowedRoles.includes(userRoleID)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    })
  );
}
}
