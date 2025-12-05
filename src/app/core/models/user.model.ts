import {UserInterface} from '../interfaces/user.interface';

export class UserModel implements UserInterface {
  id?: number;
  dtCreated?: string;
  dtLastUpdate?: string;
  vcFirstname?: string;
  vcLastname?: string;
  vcRoleName?: string;
  email?: string;
  iRoleID?: string;
  vcPhoneNumber?: string;
  OTP?: string;
  dtOTPExpiration?: string;
  dtLastSuccessfulLogin?: string;
  btEnabled?: string;
  idResponsable?: string;
  btBlocked?: string;
  tiFailedLogin?: string;
  iOrganisationID?: string;
  nameOrganisation?: string;
  contactOrganisation?: string;
  phoneNumberOrganisation?: string;
  emailOrganisation?: string;
  cityOrganisation?: string;
  paysOrganisation?: string;
  adresseOrganisation?: string;
  businessEmailDomainOrganisation?: string;
  vc2FAMode?: string;
  btMSISDNValidated?: string;
  btEmailValidated?: string;


  /**
   * Methode de verification si un utilisateur a un role
   * @param role
   */
  hasRole(role: string): boolean {
    if (!this.vcRoleName || !role) {
      return false;
    }
    return this.vcRoleName === role;
  }

  /**
   * Methode pour avoir les fullname (nom au complet)
   */
  get fullName() {
    return (this.vcFirstname && this.vcLastname) ? this.vcFirstname + ' ' + this.vcLastname : this.vcFirstname;
  }
}
