import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { Config } from '../../interfaces/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Modification des informations de configurations
  updateMultipleConfigs(
    iOrganisationID: number,
    configs: Config[]
  ): Observable<any> {
    const body = {
      iOrganisationID,
      configs,
    };

    console.log('body api : ', body);

    return this.http.post(`${this.baseUrl}/api/UpdateOrganisationConfig`, body);
  }
}
