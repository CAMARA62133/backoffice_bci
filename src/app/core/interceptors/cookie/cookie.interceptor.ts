import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Cloner la requête pour envoyer les cookies avec toutes les requêtes
  const reqWithCookies = req.clone({withCredentials: true});

  return next(reqWithCookies).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Session expirée ou cookie invalide → redirection vers login
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
};
