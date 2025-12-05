import {Injectable} from '@angular/core';
import {environment} from '../../../../environnements/environnement';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchOrgParams} from '../../../core/interfaces/search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class OrgLogService {
  private baseUrl = environment.apiUrl + '/api';

  constructor(private http: HttpClient) {
  }

  /**
   * Get All Organizations Activities Logs
   */
  getLogActiviteOrganisation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLogActiviteOrganisation`, {withCredentials: true});
  }

  /**
   * Get All Organizations Names
   */
  getNomOrganisation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNomOrganisation`, {withCredentials: true});
  }

  /**
   * Filtrage des logs a travers les parametes
   * @param params
   */
  getFilteredLogsActiviteOrganisation(params: SearchOrgParams): Observable<any> {
    // Creer une variable qui va representer les params http
    let httpParams = new HttpParams();

    // Si la date de debut est presente on l'ajout au parametres
    if (params.dateDebut) {
      httpParams = httpParams.set('dateDebut', params.dateDebut);
    }

    // Si la date de fin est presente on l'ajout aux parametres
    if (params.dateFin) {
      httpParams = httpParams.set('dateFin', params.dateFin);
    }

    // Si l'application est presente on l'ajout aux parametres
    if (params.application) {
      httpParams = httpParams.set('application', params.application);
    }

    // Si le nom de l'organisation est presente on l'ajout aux parametres
    if (params.organisation) {
      httpParams = httpParams.set('organisation', params.organisation);
    }

    if (params.username) {
      httpParams = httpParams.set('username', params.username);
    }

    console.log("Params envoyer : ", {httpParams});

    return this.http.post(`${this.baseUrl}/getFilteredLogsActiviteOrganisation`, null,
      {params: httpParams, withCredentials: true}
    );
  }
}
