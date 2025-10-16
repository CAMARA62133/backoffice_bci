import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from './../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private baseUrl = environment.apiUrl;
  private appName = environment.appName;

  constructor(private http: HttpClient) {}

  // Méthode pour vérifier le token
  verifierToken(
    token: string,
    appName: string = this.appName
  ): Observable<any> {
    const body = {};
    const params = new HttpParams().set('token', token).set('appName', appName);
    return this.http
      .post<any>(`${this.baseUrl}/api/verifyToken`, body, { params })
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur.'))
        )
      );
  }

  // Pour verifier le token et l'email de l'organisation
  checkTokenEmailOrganisation(
    token: string,
    email: string,
    appName: string = this.appName
  ) {
    const body = {};
    const params = new HttpParams()
      .set('token', token)
      .set('email', email)
      .set('appName', appName);

    return this.http
      .post<any>(`${this.baseUrl}/api/checkEmailToken`, body, { params })
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur.'))
        )
      );
  }
}
