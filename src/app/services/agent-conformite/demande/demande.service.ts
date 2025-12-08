import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environnements/environnement';
import {AuthService} from '../../auth/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  // Retourne la liste des demades de souscriptions en attentes
  allDemandesSouscriptions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/getListeDemandeSouscriptionAttente`, {
      withCredentials: true
    });
  }

  // Retourne la liste des demades de souscriptions en attentes
  oneDemandeSouscription(id:number): Observable<any> {
    const myParams = new HttpParams().set('id', id);

    return this.http.get<any>(`${this.baseUrl}/api/getListeDemandeSouscriptionAttente`, {
      params: myParams,
      withCredentials: true,
    });
  }
}
