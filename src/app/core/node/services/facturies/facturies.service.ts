import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class FacturiesService {
  private nodeApiUrl = environment.nodeApi.baseUrl;
  constructor(private http: HttpClient) {}

  // Liste des facturies
  getAllFacturies(): Observable<any> {
    return this.http.get(`${this.nodeApiUrl}/facturiers`, {
      withCredentials: true,
    });
  }

  // Ajouter un facturies
  addFacturier(payload: any): Observable<any> {
    console.log('service payload : ', { payload });
    return this.http.post(`${this.nodeApiUrl}/facturiers/add`, payload, {
      withCredentials: true,
    });
  }
}
