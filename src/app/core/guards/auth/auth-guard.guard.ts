import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../../services/auth/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    // On vérifie la session auprès du serveur (checkSession)
    return this.authService.checkSession().pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          // Si pas connecté, redirection vers login avec l'URL de retour
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }

        // On vérifie si les infos utilisateur sont présentes localement
        const user = this.authService.getCurrentUser();
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        // NOTE : On ne vérifie plus les rôles par "vcRoleName" ici.
        // C'est le RoleGuard qui s'en chargera via "iRoleID" de manière plus sûre.
        return true;
      }),

      // En cas d'erreur serveur ou réseau
      catchError(() => {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return of(false);
      }),
    );
  }
}
