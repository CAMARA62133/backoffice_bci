import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class OrgOtpLoginService {
  private appName = environment.appName;
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getVerifierOtpEmail() {
    return localStorage.getItem('validateEmailUrlEmail');
  }

  // Méthode pour vérifier l'OTP
  orgVerifierOtp(otp: string, appName: string = this.appName): Observable<any> {
    const email = this.getVerifierOtpEmail();
    const body = { otp, appName, email };
    console.log('Debug OTP Org : ', body);

    return this.http
      .post<any>(`${this.baseUrl}/api/validePhone`, body)
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }

  // Méthode pour renvoyer l'OTP
  orgReenvoieOtp(appName: string = this.appName): Observable<any> {
    const email = this.getVerifierOtpEmail();
    const body = {
      appName,
      email,
    };

    console.log('debug 1 : ', body);

    return this.http
      .post<any>(`${this.baseUrl}/api/renvoiOTPValidPhone`, body)
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }
}
