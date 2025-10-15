import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // All Roles
  getAllRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeRole`);
  }
}
