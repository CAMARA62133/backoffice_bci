import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { InactivityService } from '../inactivity/inactivity.service';
@Injectable({
  providedIn: 'root',
})
export class OtpLoginServiceService {
  appName = environment.appName;
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private inactivityService: InactivityService
  ) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Méthode pour vérifier l'OTP
  verifierOtp(
    otp: string,
    email: string | null,
    appName: string = this.appName
  ): Observable<any> {
    const body = { otp, appName, email };
    console.log(body);

    return this.http.post<any>(`${this.baseUrl}/api/verify-otp`, body).pipe(
      tap((response: any) => {
        // ✅ Si la vérification est réussie
        if (response && response.token) {
          console.log('✅ OTP validé avec succès.');

          // 🔐 Sauvegarde du token pour la session
          localStorage.setItem('token', response.token);

          // 🚀 Démarrage automatique de la surveillance d'inactivité
          this.inactivityService.startWatching();
        } else {
          console.warn('⚠️ OTP valide mais pas de token retourné.');
        }
      }),
      catchError((err) =>
        throwError(() => new Error(err?.message || 'Erreur du serveur'))
      )
    );
  }

  // Méthode pour renvoyer l'OTP
  reenvoiOtp(
    email: string | null,
    appName: string = this.appName
  ): Observable<any> {
    const body = { email, appName };
    console.log(body);

    return this.http
      .post<any>(`${this.baseUrl}/api/RenvoiOTP`, body)
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }
}
