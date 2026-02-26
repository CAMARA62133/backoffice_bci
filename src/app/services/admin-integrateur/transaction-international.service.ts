import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { ApiResponse, TransactionInternational } from '../../pages/admin-integrateur/models/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionInternationalService {
  private baseUrl = environment.nodeApi.apiUrl;
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}


  // Historique International
  getTransactionsInternational(
    organisation_id: number,
  ): Observable<ApiResponse<TransactionInternational[]>> {
    return this.http.get<ApiResponse<TransactionInternational[]>>(
      `${this.url}/api/getAllTransactionsInternation?organisation_id=${organisation_id}`,
      { withCredentials: true },
    );
  }
  /**
   * Vérifier le statut
   */
  getTransactionStatus(iRequestID: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/transactions/status/${iRequestID}`,
      { withCredentials: true },
    );
  }

  /**
   * Annuler une transaction
   */
  cancelTransaction(iRequestID: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/transactions/cancel`,
      { vcTransactionID: iRequestID },
      { withCredentials: true },
    );
  }
}
