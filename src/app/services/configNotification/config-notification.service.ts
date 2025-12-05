import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environnements/environnement';
import {AuthService} from '../auth/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigNotificationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createNotificationDefaut(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/addNotificationDefaut`, data, {withCredentials: true});
  }

  updateNotificationDefaut(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/modificationNotificationDefaut`, data, {withCredentials: true});
  }

  getListeNotification(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeNotiification`);
  }

  getListeNotiificationUsersDefaut(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeNotiificationUsersDefaut`, {withCredentials: true});
  }
}
