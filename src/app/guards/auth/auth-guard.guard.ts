import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/authService/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.getCurrentUser();

    if(!user || !this.authService.isAuthenticated()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    const exceptedRoles = route.data['roles'] as Array<string>;
    if(exceptedRoles && exceptedRoles.length > 0 && !exceptedRoles.includes(user?.vcRoleName)) {
      // Si l'utilisateur n'a pas le rôle requis, redirection vers page par défaut
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;

    // Vérifier si l'utilisateur est authentifié et si le token n'est pas expiré
    // if (this.authService.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
