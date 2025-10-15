import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authServie: AuthService) {}

  getOrganisations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getListeOrganisation`);
  }

  // Pour les infos utilisateurs
  createOrgnisation(
    vcOrgName: string,
    vcOrgContact: string,
    vcOrgPhoneNumber: string,
    vcOrgEmail: string,
    vcOrgCity: string,
    vcOrgCountry: string,
    vcOrgAddress: string,
    vcOrgLogoPath: string,
    vcBusinessEmailDomain: string,
    vcFirstname: string,
    vcLastname: string,
    vcDescription: string,
    vcUserEmail: string,
    iRoleID: string,
    iParentID: string,
    lienSite: string
  ): void {
    const token = this.authServie.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('vcOrgName', vcOrgName)
      .set('vcOrgContact', vcOrgContact)
      .set('vcOrgPhoneNumber', vcOrgPhoneNumber)
      .set('vcOrgEmail', vcOrgEmail)
      .set('vcOrgCity', vcOrgCity)
      .set('vcOrgCountry', vcOrgCountry)
      .set('vcOrgAddress', vcOrgAddress)
      .set('vcOrgLogoPath', vcOrgLogoPath)
      .set('vcBusinessEmailDomain', vcBusinessEmailDomain)
      .set('vcFirstname', vcFirstname)
      .set('vcLastname', vcLastname)
      .set('vcDescription', vcDescription)
      .set('vcUserEmail', vcUserEmail)
      .set('iRoleID', iRoleID)
      .set('iParentID', iParentID)
      .set('lienSite', lienSite);

    console.log('ORG Params : ', { params });
  }
}
