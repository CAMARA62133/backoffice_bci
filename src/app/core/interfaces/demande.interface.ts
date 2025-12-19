export interface Compte {
  vcAccountNumber?: string;
  vcAccountType?: string;
  mBalance?: string;
  vcCurrency?: string;
}

export interface Demande {
  id?: string;
  vcPersonalID?: string;
  vcPersonalName?: string;
  vcPhoneNumber?: string;
  vcEmail?: string;
  iOrganisationID?: string;
  statutDemande?: string;
  typeClient?: string;
  nomOrganisation?: string;
  contactOrganisation?: string;
  phoneOrganisation?: string;
  emailOrganisation?: string;
  BusinessEmailDomainOrg?: string | null;
  vcCountry?: string;
  vcWorkNumber?: string;
  vcAddress?: string;
  vcMotherName?: string;
  comptes?: Compte[];
}

export interface ApiResponse {
  status?: number;
  message?: string;
  data?: Demande[];
}


export interface ValidDemandePayload {
  idDemande: number,
  vcNotes: string,
  iValidatorID: number
  lienSiteClient: string
}
