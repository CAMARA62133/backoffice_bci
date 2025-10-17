import { HttpClient } from '@angular/common/http';
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
  getListeAlertesConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeAlerteConfig`);
  }

  /**
   * Ajouter une alertes
   * @param data
   * @returns
   */
  addAlerte(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();

    //dev-api-bcibank.ecash-guinee.com/api/addAlerteConfig?message=ass&idNiveauUrgence=2&typeAlerte=INFO&groupeConcerne=Ecash IT&description=cc&limiteDeclenchement=5&idModule=1
    return this.http.post(`${this.baseUrl}/api/addAlerteConfig`, data, {
      headers,
    });
  }

  /**
   * Modifier une alertes
   * @param data
   * @returns
   */
  uppdateAlerte(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();

    //dev-api-bcibank.ecash-guinee.com/api/UpdateAlerteConfig?message=nnn&idNiveauUrgence=2&typeAlerte=INFO&groupeConcerne=Ecash IT&description=cc&limiteDeclenchement=5&idModule=1&idAlerte=13
    return this.http.post(`${this.baseUrl}/api/UpdateAlerteConfig`, data, {
      headers,
    });
  }

  /**
   * Bloquer ou Debloquer une alertes
   * @param data les parametres de l'api (id, et true | false)
   * @returns
   */
  toggleAlerte(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();

    // https://dev-api-bcibank.ecash-guinee.com/api/activeOrDesactiveAlert?idAlert=13&btEnableAlert=1
    return this.http.post(`${this.baseUrl}/api/activeOrDesactiveAlert`, data, {
      headers,
    });
  }
}
