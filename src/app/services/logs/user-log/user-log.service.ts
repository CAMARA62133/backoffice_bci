import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environnements/environnement';
import {SearchParams} from '../../../interfaces/search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  private baseUrl = environment.apiUrl + '/api';

  // Constructeur
  constructor(private http: HttpClient) {
  }

  /**
   * Get all user logs
   */
  getAllUserLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLogActiviteUsers`)
  }

  /**
   * Get all usernames
   */
  getNomUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNomUsers`)
  }


  /**
   * Get Filtered Logs
   */
  getFilteredLogsActiviteUsers(params: SearchParams): Observable<any> {
    // Creer une variable qui va representer les params http
    let httpParams = new HttpParams();

    // Si Date debut est presente alors on l'ajout dans les params
    if (params.dateDebut) {
      httpParams = httpParams.set('dateDebut', params.dateDebut);
    }

    // Si Date fin est presente alors on l'ajout dans les params
    if (params.dateFin) {
      httpParams = httpParams.set('dateFin', params.dateFin);
    }

    // Si appplication est presente alors on l'ajout dans les params
    if (params.application) {
      httpParams = httpParams.set('application', params.application);
    }

    // Si user est present alors on l'ajout dans les params
    if (params.username) {
      httpParams = httpParams.set('username', params.username);
    }


    console.log("params envoyer : ", {httpParams});

    return this.http.post(`${this.baseUrl}/getFilteredLogsActiviteUsers`, null, {params: httpParams})
  }
}
