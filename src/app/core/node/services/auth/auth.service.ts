import {Injectable} from '@angular/core';
import {environment} from '../../../../../environnements/environnement';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private nodeSessionReady = new BehaviorSubject<boolean>(false);
  sessionReady$ = this.nodeSessionReady.asObservable();
  private nodeApiUrl = environment.nodeApi.baseUrl;

  constructor(private http: HttpClient) {
  }


  login(email: string | null): Observable<any> {
    const body = {email};

    return this.http.post(`${this.nodeApiUrl}/auth/login`, body, {
      withCredentials: true,
    }).pipe(
      tap(() => {
        console.log('✅ Session NodeJS établie');
        this.nodeSessionReady.next(true);
      })
    );
  }

  ensureSession(email: string): Observable<boolean> {
    if (this.nodeSessionReady.value) {
      return of(true);
    }

    return this.login(email).pipe(map(() => true));
  }
}
