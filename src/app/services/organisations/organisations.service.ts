import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authServie: AuthService) {}

  getOrganisations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeOrganisation`);
  }

  // Pour les infos utilisateurs
  createOrganisation(data: any): Observable<any> {
    const token = this.authServie.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.baseUrl}/api/addOrganisationAndUser`, data, {
      headers,
    });
  }
}
