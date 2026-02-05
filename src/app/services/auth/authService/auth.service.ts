import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../../environnements/environnement';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Stocke les informations de l'utilisateur
  // private userInfo: any = null;
  private userConfigInfo: any = null;
  private baseUrl = environment.apiUrl;
  private appName = environment.appName;
  private appVersion = environment.appVersion.vcVersion;
  private user: any = null;
  private _isAuthenticated = false;

  // ✅ Signals
  private _userInfo = signal<any | null>(null);
  private _userInfoConfig = signal<any | null>(null);

  // ✅ Exposition lecture seule
  userInfo = this._userInfo.asReadonly();
  userInfoConfig = this._userInfoConfig.asReadonly();

  // Injection de HttpClient pour les requêtes HTTP
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) this.user = JSON.parse(storedUser);
    this.restoreFromLocalStorage();
  }

  /** Charge le cookie CSRF avant login */
  getCsrfCookie(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/csrf-cookie`, {
      withCredentials: true,
    });
  }

  /** Envoie les identifiants au backend */
  loginTest(
    email: string,
    password: string,
    captcha_token: string,
    appName: string,
    appVersion: string = this.appVersion,
  ): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/api/auth/loginTest`,
        { email, password, captcha_token, appName, appVersion },
        { withCredentials: true },
      )
      .pipe(tap(() => (this._isAuthenticated = true)));
  }

  /** Récupère l'utilisateur connecté (avec cookie de session) */
  // recupUserInfo(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/api/user`, {
  //     withCredentials: true
  //   });
  // }

  /** Helper lecture cookie JS */
  public getCookieValue(name: string): string {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? decodeURIComponent(match[2]) : '';
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
   * Recupere le role de l'utilisateur connecter
   */
  getUserRole(): string {
    const user = this.getUser();
    return user?.vcRoleName || '';
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
   * @param appVersion
   */
  login(
    email: string,
    password: string,
    appName: string,
    captcha_token: string,
    appVersion: string = this.appVersion,
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
    lienSite: string = environment.lienSite,
    appName: string = this.appName,
  ): Observable<any> {
    const body = { email, appName, lienSite };
    console.log('body:', body);
    return this.http.post(`${this.baseUrl}/api/requestResetPassword`, body);
  }

  setUpdateUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserConfigInfo() {
    if (this.userConfigInfo) return this.userConfigInfo;
    const storedUserConfigInfo = localStorage.getItem('userConfigInfo');

    if (storedUserConfigInfo) {
      this.userConfigInfo = JSON.parse(storedUserConfigInfo);
      return this.userConfigInfo;
    }
  }

  /**
   * Authentification
   * Savoir si l'utilisateur est connecté (True si le token existe)
   * @returns
   */
  // isAuthenticated(): boolean {
  //   return !!this.getToken() || !!this.getCurrentUser(); // true si le token existe
  // }

  // Vérifier si l’utilisateur est connecté
  isAuthenticated(): boolean {
    // :coche_blanche: côté client : état connu grâce aux login/logout
    console.log(
      '%c[AuthService] :cadenas: isAuthenticated() =>',
      'color: cyan;',
      this._isAuthenticated,
    );
    return this._isAuthenticated;
  }

  //
  checkSession(): Observable<boolean> {
    return this.http
      .get(`${this.baseUrl}/api/user`, { withCredentials: true })
      .pipe(
        map((user) => {
          // si la requête réussit, l'utilisateur est connecté
          this._isAuthenticated = true;
          return true; // <-- retourne un boolean
        }),
        catchError(() => {
          this._isAuthenticated = false;
          return of(false); // <-- retourne aussi un boolean
        }),
      );
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
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
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
    userId: number,
    appName: string = this.appName,
  ): Observable<any> {
    // Construction des paramètres
    const params = new HttpParams()
      .set('nom', nom)
      .set('prenom', prenom)
      .set('email', email)
      .set('phoneNumber', phoneNumber)
      .set('userId', userId)
      .set('appName', appName);

    console.log('Paramètres envoyés:', params.toString());
    // Requête POST avec params au lieu de body
    return this.http
      .post<any>(`${this.baseUrl}/api/updateUserInfo`, null, {
        withCredentials: true,
        params,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Modification du mot de passe
   * @param appName  le nom de l'application
   * @param oldPassword  l'ancien mot de passe
   * @param newPassword le nouveau de mot de passe
   * @param email  l'adresse email
   * @returns
   */
  modifierPassword(
    appName: string = this.appName,
    oldPassword: string,
    newPassword: string,
    email: string,
  ): Observable<any> {
    const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json',
    // });

    const params = new HttpParams()
      .set('appName', appName)
      .set('ancienPassword', oldPassword)
      .set('Nouveaupassword', newPassword)
      .set('email', email);
    console.log('les parametres envoyes : ', params);

    return this.http.post(
      `${this.baseUrl}/api/resetPasswordAfterLogin`,
      {},
      { withCredentials: true, params },
    );
  }

  /**
   * Mise a jour du mot de passe
   * @param ancienPassword
   * @param Nouveaupassword
   * @param email
   * @param appName
   */
  updatePassword(
    ancienPassword: string,
    Nouveaupassword: string,
    email: string,
    appName: string = this.appName,
  ): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json',
    // });

    const params = new HttpParams()
      .set('appName', appName)
      .set('ancienPassword', ancienPassword)
      .set('Nouveaupassword', Nouveaupassword)
      .set('email', email);

    console.log('Parametre de modification password : ', { params });

    return this.http.post(
      `${this.baseUrl}/api/resetPasswordAfterLogin`,
      {},
      { withCredentials: true, params },
    );
  }

  /**
   * Deconnexion de l'utilisateur
   * @param appName le nom de l'application
   * @returns
   */
  deconnexion(appName: string = this.appName): Observable<any> {
    // // Recuperer le token avant toutes suppressions
    // const token = this.getToken();
    // if (!token) {
    //   return throwError(
    //     () => new Error('Token non trouvé. Veuillez vous connecter.')
    //   );
    // }

    // Prépare les en-têtes d'authentification
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json',
    // });

    // Prépare les paramètres de requête
    const params = new HttpParams().set('appName', appName);

    // Appel API de déconnexion
    return this.http
      .post(`${this.baseUrl}/api/logout`, {}, { params, withCredentials: true })
      .pipe(
        tap(() => {
          // localStorage.clear();

          // localStorage.removeItem('loginEmail');
          // localStorage.removeItem('token');
          // localStorage.removeItem('userInfo');
          // localStorage.removeItem('userInfoConfig');

          // console.log('Dexonnexion reussi !');
          // console.clear();

          localStorage.clear();
          this._userInfo.set(null);
          this._userInfoConfig.set(null);
        }),
        catchError((error) => {
          console.error('Erreur lors de la déconnexion :', error);
          return throwError(() => error);
        }),
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

  // 🧩 Restauration du localStorage
  restoreFromLocalStorage(): void {
    console.log(
      '%c[AuthService] 🔹 Restauration depuis localStorage...',
      'color: #999;',
    );

    const storedUser = localStorage.getItem('userInfo');
    const storedConfig = localStorage.getItem('userInfoConfig');

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      this._userInfo.set(parsed);
      console.log(
        '%c[AuthService] 🟢 Utilisateur restauré :',
        'color: #6f6;',
        parsed,
      );
    } else {
      console.log('%c[AuthService] ⚠️ Aucun userInfo trouvé', 'color: orange;');
    }

    if (storedConfig) {
      const parsedConfig = JSON.parse(storedConfig);
      this._userInfoConfig.set(parsedConfig);
      console.log(
        '%c[AuthService] ⚙️ Config restaurée :',
        'color: #0ff;',
        parsedConfig,
      );
    }
  }

  setUserInfo(userInfo: any): void {
    console.log(
      '%c[AuthService] 🟢 setUserInfo() appelé avec :',
      'color: #6f6;',
      userInfo,
    );
    const previous = this._userInfo();
    console.log('%c[AuthService] Ancienne valeur :', 'color: gray;', previous);

    this._userInfo.set({ ...userInfo }); // clone → force la réactivité
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    console.log(
      '%c[AuthService] ✅ Nouvelle valeur signal userInfo :',
      'color: #0f0;',
      this._userInfo(),
    );
  }

  getUserInfo(): any {
    console.log('%c[AuthService] 📖 getUserInfo() appelé', 'color: #09f;');
    const user = this._userInfo();
    if (user) {
      console.log(
        '%c[AuthService] ↪️ Signal actuel userInfo :',
        'color: #0ff;',
        user,
      );
      return user;
    }

    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const parsed = JSON.parse(stored);
      this._userInfo.set(parsed);
      console.log(
        '%c[AuthService] 🔄 Restauré depuis localStorage :',
        'color: #6f6;',
        parsed,
      );
      return parsed;
    }

    console.warn(
      '%c[AuthService] ⚠️ Aucun userInfo disponible',
      'color: orange;',
    );
    return null;
  }

  setUserInfoConfig(config: any): void {
    console.log(
      '%c[AuthService] ⚙️ setUserInfoConfig() appelé avec :',
      'color: cyan;',
      config,
    );

    const previous = this._userInfoConfig();
    console.log('%c[AuthService] Ancienne valeur :', 'color: gray;', previous);

    this._userInfoConfig.set({ ...config });
    localStorage.setItem('userInfoConfig', JSON.stringify(config));

    console.log(
      '%c[AuthService] ✅ Nouvelle valeur signal userInfoConfig :',
      'color: #00e;',
      this._userInfoConfig(),
    );
  }

  getUserInfoConfig(): any {
    console.log(
      '%c[AuthService] 📖 getUserInfoConfig() appelé',
      'color: #09f;',
    );
    const config = this._userInfoConfig();
    if (config) {
      console.log(
        '%c[AuthService] ↪️ Signal actuel config :',
        'color: #0ff;',
        config,
      );
      return config;
    }

    const stored = localStorage.getItem('userInfoConfig');
    if (stored) {
      const parsed = JSON.parse(stored);
      this._userInfoConfig.set(parsed);
      console.log(
        '%c[AuthService] 🔄 Restauré depuis localStorage :',
        'color: #6f6;',
        parsed,
      );
      return parsed;
    }

    console.warn(
      '%c[AuthService] ⚠️ Aucun userInfoConfig disponible',
      'color: orange;',
    );
    return null;
  }

  getCurrentUser() {
    // Exemple : récupérer depuis localStorage ou une variable
    const userJson = localStorage.getItem('userInfo');
    return userJson ? JSON.parse(userJson) : null;
  }
}
