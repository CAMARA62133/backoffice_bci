import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // All Roles
  getAllRoles(): Observable<any> {
    const headers = this.authService.setRequestHeaders();
    return this.http.get(`${this.baseUrl}/api/getListeRole`, { headers });
  }
}
