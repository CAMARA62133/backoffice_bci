import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class StatusBancaireService {
  private baseUrl = environment.nodeApi.baseUrl;

  constructor(private http: HttpClient) {}

  coreBankingStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/core_banking/status`);
  }
}
