import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environnements/environnement';
import {RejectRaisonApiResponse} from '../../../interfaces/reject-raison.interface';

@Injectable({
  providedIn: 'root'
})
export class RejectRaisonService {
  private nodeApiUrl = environment.nodeApi.baseUrl;

  constructor(private http: HttpClient) {
  }

  //
  getAllRejectRaisons(): Observable<RejectRaisonApiResponse> {
    return this.http.get<RejectRaisonApiResponse>(`${this.nodeApiUrl}/reject-reasons`, {withCredentials: true});
  }
}
