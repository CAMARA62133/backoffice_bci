import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environnements/environnement';
@Injectable({
  providedIn: 'root',
})
export class OtpLoginServiceService {
  appName = environment.appName;
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Méthode pour vérifier l'OTP
  verifierOtp(otp: string, appName: string = this.appName): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return throwError(
        () => new Error('Token non trouvé. Veuillez vous connecter.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = { otp, appName };
    console.log(body);

    return this.http
      .post<any>(`${this.baseUrl}/api/verify-otp`, body, { headers })
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }

  // Méthode pour renvoyer l'OTP
  reenvoiOtp(appName: string = this.appName): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(
        () => new Error('Token non trouvé. Veuillez vous connecter.')
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = { appName };
    console.log(body);
    return this.http
      .post<any>(`${this.baseUrl}/api/RenvoiOTP`, body, { headers })
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }
}
