import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // CREATE - Créer un nouvel utilisateur
  createUser(payload: any): Observable<any> {
    console.log('Create user params : ', { payload });

    return this.http.post<any>(`${this.apiUrl}/createUser`, payload, {
      headers: this.getHeaders(),
    });
  }

  // READ - Récupérer tous les utilisateurs
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, {
      headers: this.getHeaders(),
    });
  }

  // READ - Récupérer un utilisateur par ID
  getUserById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // UPDATE - Mettre à jour un utilisateur
  updateUser(id: string | number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, payload, {
      headers: this.getHeaders(),
    });
  }

  // DELETE - Supprimer un utilisateur
  deleteUser(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Bloquer et Debloquer
  toggleUserStatus(
    id: string | string,
    currentStatus: boolean
  ): Observable<any> {
    const payload = { isBlocked: !currentStatus };
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, payload, {
      headers: this.getHeaders(),
    });
  }
}
