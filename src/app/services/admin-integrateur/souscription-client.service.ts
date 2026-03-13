import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { ClientAccountResponse } from '../../pages/admin-integrateur/models/souscription.client.interface';


@Injectable({
  providedIn: 'root',
})
export class SouscriptionClientService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère les informations et la liste des comptes du client
   * @param clientID Identifiant unique du client (ex: 100012)
   */
  getInfoCompteClientAjout(
    clientID: string,
  ): Observable<ClientAccountResponse> {
    const url = `${this.baseUrl}/api/getInfoCompteClientAjoout?clientID=${clientID}`;

    return this.http.post<ClientAccountResponse>(
      url,
      {}, // Body vide car le paramètre est en query string
      { withCredentials: true },
    );
  }
}
