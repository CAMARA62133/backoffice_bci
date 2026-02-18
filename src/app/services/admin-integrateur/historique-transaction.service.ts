import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { TransactionResponse } from '../../pages/admin-integrateur/models/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoriqueTransactionService {
  private baseUrl = environment.nodeApi.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère l'historique complet
   */
  getHistoriqueTransactions(): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(
      `${this.baseUrl}/api/transactions/history`,
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
