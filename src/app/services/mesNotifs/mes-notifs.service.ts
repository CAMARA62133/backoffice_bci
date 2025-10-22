import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MesNotifsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  mesNotifications(idRole: number | string): Observable<any> {
    // const headers = this.authService.setRequestHeaders();
    const params = new HttpParams().set('idRole', idRole);
    return this.http.get(`${this.baseUrl}/api/getListeNotiificationUsers`, {
      params,
    });
  }
}
