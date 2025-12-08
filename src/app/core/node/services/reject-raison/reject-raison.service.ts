import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environnements/environnement';
import { RejectRaisonApiResponse } from '../../../interfaces/reject-raison.interface';

@Injectable({
  providedIn: 'root',
})
export class RejectRaisonService {
  private nodeApiUrl = environment.nodeApi.baseUrl;

  constructor(private http: HttpClient) {}

  // liste des raisons de bloquage
  getAllRejectRaisons(): Observable<RejectRaisonApiResponse> {
    return this.http.get<RejectRaisonApiResponse>(
      `${this.nodeApiUrl}/reject-reasons`,
      { withCredentials: true }
    );
  }

  // rejecter une demande
  rejectedDemande(payload: any): Observable<any> {
    return this.http.post(
      `${this.nodeApiUrl}/demande/rejeterDemandeSoumission`,
      payload,
      { withCredentials: true }
    );
  }

  // Valider une demande
  validateDemande(payload: any): Observable<any> {
    return this.http.post(
      `${this.nodeApiUrl}/demande/validerDemandeSoumission`,
      payload,
      { withCredentials: true }
    );
  }
}
