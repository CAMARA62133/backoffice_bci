import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Récupérer tout les pays
   * @returns
   */
  getAllPays(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListePays`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Récupérer tout les rôles
   * @returns
   */
  getAllRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeRole`, {
      headers: this.getHeaders(),
    });
  }
}
