import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigNotificationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createNotificationDefaut(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.post<any>(
      `${this.baseUrl}/api/addNotificationDefaut`,
      data,
      {
        headers,
      }
    );
  }

  updateNotificationDefaut(data: any): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.post<any>(
      `${this.baseUrl}/api/modificationNotificationDefaut`,
      data,
      { headers }
    );
  }

  getListeNotification(): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.get(`${this.baseUrl}/api/getListeNotiification`);
  }

  getListeNotiificationUsersDefaut(): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.get(
      `${this.baseUrl}/api/getListeNotiificationUsersDefaut`,
      { headers }
    );
  }

  // idRole=
  getListeNotiificationUsers(idRole: number | string): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    const params = new HttpParams().set('idRole', idRole);

    return this.http.get(`${this.baseUrl}/api/getListeNotiificationUsers`, {
      params,
    });
  }
}
