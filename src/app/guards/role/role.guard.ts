import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getUserInfo() || {};

    const allowedRoles =
      (route.data['roles'] as Array<number | string>) || null;
    const excludedRoles =
      (route.data['exclude'] as Array<number | string>) || null;

    console.log('allowedRoles:', route.data['roles']);
    console.log('exclude:', route.data['exclude']);
    console.log('user.iRoleID:', user.iRoleID, typeof user.iRoleID);

    if (!user || user.iRoleID === undefined || user.iRoleID === null) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRoleStr = String(user.iRoleID);

    if (excludedRoles) {
      const excludedStr = excludedRoles.map((r) => String(r));
      if (excludedStr.includes(userRoleStr)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    if (allowedRoles) {
      const allowedStr = allowedRoles.map((r) => String(r));
      if (!allowedStr.includes(userRoleStr)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}
