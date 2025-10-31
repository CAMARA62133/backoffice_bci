import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from './../../../environnements/environnement';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Stocke les informations de l'utilisateur
  private userInfo: any = null;
  private userConfigInfo: any = null;
  private baseUrl = environment.apiUrl;
  private appName = environment.appName;
  private appVersion = environment.appVersion.vcVersion;
  private user: any = null;

  // Injection de HttpClient pour les requêtes HTTP
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) this.user = JSON.parse(storedUser);
  }

  /**
   * Retourne le user complet
   * @returns
   */
  getUser() {
    return this.user;
  }

  /**
   * Retourne l'iRoleID
   * @returns
   */
  getRoleID(): number | null {
    return this.user?.iRoleID ?? null;
  }

  /**
   * Vérifie si le rôle correspond à un ou plusieurs rôles autorisés
   * @returns
   */
  hasRole(allowedRoles: number[]): boolean {
    const role = this.getRoleID();
    return role !== null && allowedRoles.includes(role);
  }

  /**
   * Vérifie si l’utilisateur est connecté
   * @returns
   */
  isLoggedIn(): boolean {
    return !!this.user;
  }

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
    captcha_token: string,
    appVersion: string = this.appVersion
  ): Observable<any> {
    // captcha_token => a ajouter dans le body si recaptcha est activé
    const body = { email, password, appName, captcha_token, appVersion };
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
    // lienSite: string = 'https://devbackoffice-bci.ecash-guinee.com',
    appName: string = this.appName
  ): Observable<any> {
    const body = { email, appName, lienSite };
    console.log('body:', body);
    return this.http.post(`${this.baseUrl}/api/requestResetPassword`, body);
  }

  /**
   * Ajouter les informations de l'utilisateur depuis la mémoire ou le localStorage
   * @param userInfo les informations de l'utilisateur connecter
   * @param userConfigInfo les informations de l'organisation de l'utilisateur connnecter
   */
  setUserInfo(userInfo: any, userConfigInfo: any): void {
    this.userInfo = userInfo;
    this.userConfigInfo = userConfigInfo || null;

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('userConfigInfo', JSON.stringify(userConfigInfo));
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
    // localStorage.removeItem('token');
    // localStorage.removeItem('userInfo');
    localStorage.clear();
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
   * Headers pour les requêtes HTTP
   * @returns
   */
  setRequestHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) throw new Error('No token found');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  /**
   * Modification des informations du profile utilisateur
   * @param nom : le nom
   * @param prenom : Le prenom
   * @param email : l'adresse Email
   * @param phoneNumber : le numero de telephone
   * @param userId : l'ID de l'utilisateur
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
   * Modification du mot de passe
   * @param appName : le nom de l'application
   * @param oldPassword : l'ancien mot de passe
   * @param newPassword : le nouveau de mot de passe
   * @param email : l'adresse email
   * @returns
   */
  modifierPassword(
    appName: string = this.appName,
    oldPassword: string,
    newPassword: string,
    email: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('appName', appName)
      .set('ancienPassword', oldPassword)
      .set('Nouveaupassword', newPassword)
      .set('email', email);
    console.log('les parametres envoyes : ', params);

    return this.http.post(
      `${this.baseUrl}/api/resetPasswordAfterLogin`,
      {},
      { headers, params }
    );
  }

  updatePassword(
    ancienPassword: string,
    Nouveaupassword: string,
    email: string,
    appName: string = this.appName
  ): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('appName', appName)
      .set('ancienPassword', ancienPassword)
      .set('Nouveaupassword', Nouveaupassword)
      .set('email', email);

    console.log('Parametre de modification password : ', { params });

    return this.http.post(
      `${this.baseUrl}/api/resetPasswordAfterLogin`,
      {},
      { headers, params }
    );
  }

  /**
   * Deconnexion de l'utilisateur
   * @param appName : le nom de l'application
   * @returns
   */
  deconnexion(appName: string = this.appName): Observable<any> {
    // Recuperer le token avant toutes suppressions
    const token = this.getToken();
    if (!token) {
      return throwError(
        () => new Error('Token non trouvé. Veuillez vous connecter.')
      );
    }

    // Prépare les en-têtes d'authentification
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Prépare les paramètres de requête
    const params = new HttpParams().set('appName', appName);

    // Appel API de déconnexion
    return this.http
      .post(`${this.baseUrl}/api/logout`, {}, { headers, params })
      .pipe(
        tap(() => {
          localStorage.clear();
          console.log('Dexonnexion reussi !');
        }),
        catchError((error) => {
          console.error('Erreur lors de la déconnexion :', error);
          return throwError(() => error);
        })
      );
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
