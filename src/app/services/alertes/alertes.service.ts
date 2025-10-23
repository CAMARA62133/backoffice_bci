import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlertesService {
  baseUrl = environment.apiUrl;
  appName = environment.appName;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Liste des modules
   * @returns Observable<any>
   */
  getListeModules(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeModule`);
  }

  /**
   * Liste des niveaux d'urgence
   * @returns
   */
  getListeNiveauUrgence(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListNieauDurgence`);
  }

  /**
   *  Liste des groupes concerncer
   * @returns
   */
  getListeGroupeConcerner(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeGroupeAlert`);
  }

  /**
   * Liste des configuration d'alertes
   * @returns
   */
  getListeAlertesConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeAlerteConfig`);
  }

  /**
   * Ajouter une alertes
   * @param data : Les donnees passer lors de la confugration d'une alerte
   * @returns
   */
  createAlerte(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.post(`${this.baseUrl}/api/addAlerteConfig`, data, {
      headers,
    });
  }

  /**
   * Modifier une alertes
   * @param data Les donnees passer lors de la modidification d'une alerte
   * @returns
   */
  uppdateAlerte(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.post(`${this.baseUrl}/api/UpdateAlerteConfig`, data, {
      headers,
    });
  }

  toggleAlerte(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    const params = new HttpParams()
      .set('idAlert', data.idAlert.toString())
      .set('btEnableAlert', data.btEnableAlert);

    return this.http.post(`${this.baseUrl}/api/activeOrDesactiveAlert`, null, {
      params: params,
      headers: headers,
    });
  }
}
