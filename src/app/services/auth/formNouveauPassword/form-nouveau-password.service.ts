import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class FormNouveauPasswordService {
  private baseUrl = environment.apiUrl;
  private appName = environment.appName;

  constructor(private http: HttpClient) {}

  private getResetEmail(): string | null {
    return localStorage.getItem('urlEmail');
  }

  private getResetToken(): string | null {
    return localStorage.getItem('urlToken');
  }

  verifierToken(
    nouveauPassword: string,
    appName: string = this.appName
  ): Observable<any> {
    const token = this.getResetToken();
    const email = this.getResetEmail();

    const params = new HttpParams()
      .set('token', token ?? '')
      .set('Nouveaupassword', nouveauPassword)
      .set('email', email ?? '')
      .set('appName', appName);

    return this.http
      .post<any>(`${this.baseUrl}/api/resetPassword`, {}, { params })
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur.'))
        )
      );
  }
}
