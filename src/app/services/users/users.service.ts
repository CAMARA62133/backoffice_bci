import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  appName = environment.appName;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Headers avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Créer un nouvel utilisateur
   * @param payload
   * @returns
   */
  createUser(payload: any): Observable<any> {
    console.log('Create user payload : ', { payload });

    const body = { ...payload, appName: environment.appName };
    console.log('Create user body : ', { body });

    return this.http.post(`${this.apiUrl}/api/addUsers`, body, {
      headers: this.getHeaders(),
    });
  }

  /**
   *  Récupérer tous les utilisateurs
   * @returns
   */
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getListeUsers`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Bloquer et Debloquer
   * @param data sont les paramatres qui sont passer dans l'API (idUsers et btEnabled)
   * @returns
   */
  toggleUserStatus(data: any): Observable<any> {
    const currentParams = new HttpParams()
      .set('idUsers', data.idUsers)
      .set('btEnabled', data.btEnabled);

    return this.http.post(
      `${this.apiUrl}/api/activeOrDesactiveUsers`,
      {},
      {
        headers: this.getHeaders(),
        params: currentParams,
      }
    );
  }
}
