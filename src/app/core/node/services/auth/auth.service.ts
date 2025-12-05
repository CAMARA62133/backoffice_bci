import {Injectable} from '@angular/core';
import {environment} from '../../../../../environnements/environnement';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private nodeApiUrl = environment.nodeApi.baseUrl;

  constructor(private http: HttpClient) {
  }


  login(email: string | null): Observable<any> {
    const body = {email};

    return this.http.post(`${this.nodeApiUrl}/auth/login`, body, {
      withCredentials: true,
    });
  }
}
