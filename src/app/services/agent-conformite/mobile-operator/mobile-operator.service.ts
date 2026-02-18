import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MobileOperator, MobileOperatorResponse } from '../../../pages/agent-conformite/mobile-operator/models/mobile-operator.model';

@Injectable({
  providedIn: 'root',
})
export class MobileOperatorService {
  private apiUrl = 'https://dev-bcibank-api-js.ecash-guinee.com/api';
  private token = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('api_token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
  }

  private parseTextResponse(text: string): any {
    const cleanText = text.replace(/^[^{]*/, '');
    return JSON.parse(cleanText);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('api_token', token);
  }

  getAll(): Observable<MobileOperatorResponse> {
    return this.http
      .get(`${this.apiUrl}/mobile-operators`, {
        headers: this.getHeaders(),
        responseType: 'text',
      })
      .pipe(map((text) => this.parseTextResponse(text)));
  }

  getById(id: number): Observable<MobileOperatorResponse> {
    return this.http
      .get(`${this.apiUrl}/mobile-operators/${id}`, {
        headers: this.getHeaders(),
        responseType: 'text',
      })
      .pipe(map((text) => this.parseTextResponse(text)));
  }

  create(operator: MobileOperator): Observable<MobileOperatorResponse> {
    return this.http
      .post(`${this.apiUrl}/mobile-operators`, operator, {
        headers: this.getHeaders(),
        responseType: 'text',
      })
      .pipe(map((text) => this.parseTextResponse(text)));
  }

  update(operator: MobileOperator): Observable<MobileOperatorResponse> {
    return this.http
      .post(`${this.apiUrl}/mobile-operators/update`, operator, {
        headers: this.getHeaders(),
        responseType: 'text',
      })
      .pipe(map((text) => this.parseTextResponse(text)));
  }

  toggle(id: number, btEnabled: boolean): Observable<MobileOperatorResponse> {
    return this.http
      .patch(
        `${this.apiUrl}/mobile-operators/toggle`,
        { id, btEnabled },
        {
          headers: this.getHeaders(),
          responseType: 'text',
        },
      )
      .pipe(map((text) => this.parseTextResponse(text)));
  }

  delete(id: number): Observable<MobileOperatorResponse> {
    return this.http
      .delete(`${this.apiUrl}/mobile-operators/${id}`, {
        headers: this.getHeaders(),
        responseType: 'text',
      })
      .pipe(map((text) => this.parseTextResponse(text)));
  }
}
