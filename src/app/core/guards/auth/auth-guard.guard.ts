import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {AuthService} from '../../../services/auth/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // const user = this.authService.getCurrentUser();
    //
    // if(!user || !this.authService.isAuthenticated()) {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    //
    // const exceptedRoles = route.data['roles'] as Array<string>;
    // if(exceptedRoles && exceptedRoles.length > 0 && !exceptedRoles.includes(user?.vcRoleName)) {
    //   // Si l'utilisateur n'a pas le rôle requis, redirection vers page par défaut
    //   this.router.navigate(['/unauthorized']);
    //   return false;
    // }

    // return true;

    return this.authService.checkSession().pipe(
      map((isLoggedIn: boolean) => {
        // S'il n'est pas connecter on lui redirige sur la page login
        if (!isLoggedIn) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }

        // Sinon on recuperer l'utilisateur dans le localStorage
        const user = this.authService.getCurrentUser();

        // Si n'y pas d'utilisateur dans le locaStorage => deconnexion
        if (!user) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
          // this.authService.logout();
          // this.router.navigate(['/login']);
          // return false;
        }

        // Variables qui contient la liste roles dans une array
        const exceptedRoles = route.data['roles'] as string[];

        // S'il n'y a pas de role defini et si le role de l'user n'existe pas dans le tableau de role => non autoriser
        if (exceptedRoles?.length && !exceptedRoles.includes(user.vcRoleName)) {
          this.router.navigate(['unauthorized']);
          return false;
        }

        // Sinon on retour true
        return true;
      }),

      // En cas d'erreur
      catchError(() => {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
        return of(false);
      })
    )


    // Vérifie la session côté serveur via cookie
    // return this.authService.checkSession().pipe(
    //   map((isLoggedIn: boolean) => {
    //     if (isLoggedIn) {
    //       console.log('Logged in', isLoggedIn);
    //       const user = this.authService.getCurrentUser();
    //
    //       // Si l'utilisateur existe
    //       if (!user) {
    //         this.authService.logout();
    //         this.router.navigate(['/login']);
    //         return false;
    //       }
    //
    //       console.log('user', user);
    //       // Verifier les roels
    //       const exceptedRoles = route.data['roles'] as Array<string>;
    //       if (exceptedRoles && exceptedRoles.length > 0 && !exceptedRoles.includes(user?.vcRoleName)) {
    //         console.log('non autoriser')
    //         // Si l'utilisateur n'a pas le rôle requis, redirection vers page par défaut
    //         this.router.navigate(['/unauthorized']);
    //         return false;
    //       }
    //
    //       return true;
    //     }
    //
    //     // Session invalide → redirection login
    //     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    //     return false;
    //   }),
    //
    //   catchError(() => {
    //     // En cas d’erreur serveur → redirection login
    //     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    //     return of(false);
    //   })
    // );

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
