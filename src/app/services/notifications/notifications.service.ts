import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  baseUrl = environment.apiUrl;
  appName = environment.appName;

  constructor(private http: HttpClient, private authService: AuthService) {}

  //
  getListeModules(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeModule`);
  }

  //
  getListeNiveauUrgence(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListNieauDurgence`);
  }

  //
  getListeGroupeConcerner(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeGroupeAlert`);
  }

  //
  getListeNotificationsConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeAlerteConfig`);
  }

  /**
   * Ajouter une Notification
   * @param data
   * @returns
   */
  addNotification(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();

    // https://dev-api-bcibank.ecash-guinee.com/api/addNotificationConfig?message=ass&idNiveauUrgence=2&typeAlerte=INFO&description=cc&limiteDeclenchement=5&idModule=1
    return this.http.post(`${this.baseUrl}/api/addNotificationConfig`, data, {
      headers,
    });
  }

  /**
   * Modifier une Notification
   * @param data
   * @returns
   */
  uppdateNotification(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();

    // https://dev-api-bcibank.ecash-guinee.com/api/UpdateNotificationConfig?message=bien&idNiveauUrgence=2&typeAlerte=INFO&description=cc&limiteDeclenchement=5&idModule=1&idAlerte=3
    return this.http.post(
      `${this.baseUrl}/api/UpdateNotificationConfig`,
      data,
      {
        headers,
      }
    );
  }

  /**
   * Bloquer ou Debloquer une Notification
   * @param data les parametres de l'api (id, et true | false)
   * @returns
   */
  toggleNotification(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();

    // https://dev-api-bcibank.ecash-guinee.com/api/activeOrDesactiveNotification?idNotification=4&btEnabled=0
    return this.http.post(
      `${this.baseUrl}/api/activeOrDesactiveNotification`,
      data,
      {
        headers,
      }
    );
  }
}
