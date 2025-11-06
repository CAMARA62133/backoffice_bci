import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  baseUrl = environment.apiUrl;
  appName = environment.appName;
  public headers!: HttpHeaders;

  constructor(private http: HttpClient, private authServie: AuthService) {
    this.headers = authServie.setRequestHeaders();
  }

  getOrganisations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeOrganisation`);
  }

  getListePays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListePays`);
  }

  // getListeOrganisationConfig(data: any): Observable<any> {
  //   const params = new HttpParams().set(
  //     'iOrganisationID',
  //     data?.iOrganisationID
  //   );
  //   return this.http.get(
  //     `${this.baseUrl}/api/getListeOrganisationConfig`,
  //     {},
  //   );
  // }

  // Pour les infos organisation
  createOrganisation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/addOrganisationAndUser`, data, {
      headers: this.headers,
    });
  }

  // Mise a jour des infos
  updateOrganisation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/updateOrganisation`, data, {
      headers: this.headers,
    });
  }

  // Modifier le password de l'organisation
  resetPasswordOrganisation(
    newPassword: string,
    appName: string = this.appName
  ): Observable<any> {
    const token = this.getResetOrgPasswordToken();
    const email = this.getResetOrgPasswordEmail();

    const params = new HttpParams()
      .set('token', token ?? '')
      .set('Nouveaupassword', newPassword)
      .set('email', email ?? '')
      .set('appName', appName);

    return this.http
      .post<any>(
        `${this.baseUrl}/api/resetPasswordOrganisation`,
        {},
        { params }
      )
      .pipe(
        catchError((err) =>
          throwError(() => new Error(err?.message || 'Erreur du serveur'))
        )
      );
  }

  // Activer ou Desactiver une organisation
  toggleActiveOrDesactiveOrg(data: any): Observable<any> {
    const params = new HttpParams()
      .set('idOrganisation', data.idOrganisation)
      .set('btEnabled', data.btEnabled);

    return this.http.post(
      `${this.baseUrl}/api/activeOrDesactiveOrganisation`,
      {},
      { params }
    );
  }

  // Renvoie du lien de verification d'email
  renvoieLienVerification(businnessEmailDomain: string): Observable<any> {
    const params = new HttpParams()
      .set('vcBusinessEmailDomain', businnessEmailDomain)
      .set('lienSite', environment.lienSite);

    return this.http.post<any>(
      `${this.baseUrl}/api/renvoisEmailValidationAnouveau`,
      {},
      { params }
    );
  }

  private getResetOrgPasswordToken(): string | null {
    return localStorage.getItem('validateEmailUrlToken');
  }

  private getResetOrgPasswordEmail(): string | null {
    return localStorage.getItem('validateEmailUrlEmail');
  }
}
