import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environnements/environnement';
import { FacturierToggleStatus } from '../../../interfaces/facturies.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturiesService {
  private nodeApiUrl = environment.nodeApi.baseUrl;
  private facturierImgUrl = environment.nodeApi.facturierImgUrl;
  constructor(private http: HttpClient) {}

  // Liste des facturies
  getAllFacturies(): Observable<any> {
    return this.http.get(`${this.nodeApiUrl}/facturiers`, {
      withCredentials: true,
    });
  }

  // Afficher l'image et le telecharger
  getFacturierImage(vcImageName: string): Observable<Blob> {
    const fileName = vcImageName.split('/').pop();
    return this.http.get(`${this.facturierImgUrl}/${fileName}`, {
      responseType: 'blob',
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

  updateFacturier(payload: any): Observable<any> {
    console.log('service payload : ', payload);
    return this.http.put(`${this.nodeApiUrl}/facturiers/update`, payload, {
      withCredentials: true,
    });
  }

  toggleFacturier(payload: FacturierToggleStatus): Observable<any> {
    console.log('service payload : ', { payload });
    return this.http.post(`${this.nodeApiUrl}/facturiers/toggle`, payload, {
      withCredentials: true,
    });
  }
}
