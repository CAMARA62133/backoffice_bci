import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getUserInfo();

    // 1. Vérification de l'existence de l'utilisateur et de son iRoleID
    if (!user || user.iRoleID === undefined || user.iRoleID === null) {
      this.router.navigate(['/login']);
      return false;
    }

    // Conversion forcée en nombre pour garantir la comparaison
    const userRoleID = Number(user.iRoleID);

    // Récupération des données de la route avec un typage propre
    const allowedRoles = route.data['roles'] as Array<number> | undefined;
    const excludedRoles = route.data['exclude'] as Array<number> | undefined;

    // LOGS pour le debug (à retirer en production)
    console.log('User Role ID:', userRoleID);
    console.log('Allowed:', allowedRoles);
    console.log('Excluded:', excludedRoles);

    // 2. Gestion des exclusions (Prioritaire)
    // Si le rôle de l'utilisateur est dans la liste "exclude", on bloque.
    if (excludedRoles && excludedRoles.length > 0) {
      if (excludedRoles.map(Number).includes(userRoleID)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    // 3. Gestion des autorisations
    // Si "roles" est défini, l'utilisateur DOIT en faire partie.
    if (allowedRoles && allowedRoles.length > 0) {
      const isAuthorized = allowedRoles.map(Number).includes(userRoleID);

      if (!isAuthorized) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    // Si aucune restriction n'a bloqué, on autorise l'accès
    return true;
  }
}
