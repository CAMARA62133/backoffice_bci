import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../authService/auth.service';


@Injectable({
  providedIn: 'root',
})

export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles: number[] = route.data['roles']; // récupère les rôles autorisés

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // pas connecté
      return false;
    }

    if (!this.authService.hasRole(allowedRoles)) {
      this.router.navigate(['/access-denied']); // pas le bon rôle
      return false;
    }

    return true; // tout est OK
  }
}
