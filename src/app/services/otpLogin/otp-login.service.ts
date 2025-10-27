import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
  verifierOtp(
    otp: string,
    email: string | null,
    appName: string = this.appName
  ): Observable<any> {
    const body = { otp, appName, email };
    console.log(body);

    return this.http
      .post<any>(`${this.baseUrl}/api/verify-otp`, body)
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }

  // Méthode pour renvoyer l'OTP
  reenvoiOtp(appName: string = this.appName): Observable<any> {
    const body = { appName };
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
