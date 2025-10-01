import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environnements/environnement';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Stocke les informations de l'utilisateur
  private userInfo: any = null;

  // URL de base de l'API
  private baseUrl = environment.apiUrl;

  // Injection de HttpClient pour les requêtes HTTP
  constructor(private http: HttpClient) {}

  /**
   * Connexion des utilisateurs
   * @param email
   * @param password
   * @param appName
   * @param captcha_token
   * @returns
   */
  login(
    email: string,
    password: string,
    appName: string,
    captcha_token: string
  ): Observable<any> {
    // captcha_token => a ajouter dans le body si recaptcha est activé
    const body = { email, password, appName, captcha_token};
    console.log('Login body:', body);
    return this.http.post(`${this.baseUrl}/api/login`, body);
  }

  /**
   * Réinitialisation du mot de passe
   * @param email
   * @param lienSite
   * @param appName
   * @returns
   */
  requestResetPassword(
    email: string,
    lienSite: string = 'http://localhost:4200',
    appName: string = 'Backoffice web site'
  ): Observable<any> {
    const body = { email, appName, lienSite };
    console.log('body:', body);
    return this.http.post(`${this.baseUrl}/api/requestResetPassword`, body);
  }

  /**
   * Ajouter les informations de l'utilisateur depuis la mémoire ou le localStorage
   * @param userInfo
   */
  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  /**
   * Récupère les informations de l'utilisateur depuis la mémoire ou le localStorage
   * @returns
   */
  getUserInfo(): any {
    if (this.userInfo) return this.userInfo;
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
      return this.userInfo;
    }
    return null;
  }

  /**
   * Authentification
   * Savoir si l'utilisateur est connecté (True si le token existe)
   * @returns
   */
  isAuthenticated(): boolean {
    return !!this.getToken(); // true si le token existe
  }

  /**
   * Sauvegarde le token dans le localStorage
   * @param token
   */
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Récupère le token depuis le localStorage
   * @returns
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Déconnexion de l'utilisateur
   * en supprimant le token et les infos utilisateur du localStorage
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // localStorage.clear();
  }

  /**
   * Headers d'authentification pour les requêtes HTTP
   * @returns
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) throw new Error('No token found');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /**
   * Modification des informations du profile utilisateur
   * @param nom
   * @param prenom
   * @param email
   * @param phoneNumber
   * @param userId
   * @returns
   */
  modifierProfile(
    nom: string,
    prenom: string,
    email: string,
    phoneNumber: string,
    userId: number
  ): Observable<any> {
    // Construction des paramètres
    const params = new HttpParams()
      .set('nom', nom)
      .set('prenom', prenom)
      .set('email', email)
      .set('phoneNumber', phoneNumber)
      .set('userId', userId);
    console.log('Paramètres envoyés:', params.toString());
    // Requête POST avec params au lieu de body
    return this.http
      .post<any>(`${this.baseUrl}/api/updateUserInfo`, null, {
        headers: this.getAuthHeaders(),
        params, // envoie en query string
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Gestion des erreurs HTTP (en cas d'echec de requête)
   * @param error
   * @returns
   */
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }
}
