import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environnements/environnement';
import {AuthService} from '../auth/authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MesNotifsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // Pour affiche la liste des notifications de l'utilisateur courrant connecter
  mesNotifications(idUser: number | string): Observable<any> {
    const params = new HttpParams().set('idUsersConnect', idUser.toString());
    return this.http.get(`${this.baseUrl}/api/getListeNotiificationUsers`,
      {params: params, withCredentials: true}
    );
  }

  // Pour bloquer ou debloquer la notification de l'user courrant.
  setToggleNotification(data: any): Observable<any> {
    // const headers = this.authService.setRequestHeaders();

    const params = new HttpParams()
      .set('idNotification', data.idNotification.toString())
      .set('btEnabled', data.btEnabled.toString());

    return this.http.post(
      `${this.baseUrl}/api/activeOrDesactiveNotificationUsers`,
      null,
      {
        params: params,
        withCredentials: true
      }
    );
  }
}
