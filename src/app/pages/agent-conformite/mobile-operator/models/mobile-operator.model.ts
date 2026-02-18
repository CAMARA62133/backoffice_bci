export interface MobileOperator {
  OperatorID?: number;
  OperatorName: string;
  Contact?: string;
  PhoneNumber?: string;
  Email?: string;
  City?: string;
  Country?: string;
  Address?: string;
  LogoPath?: string;
  AccountName?: string;
  AccountNumber?: string;
  FeeAmount?: number;
  IsPercentage?: boolean;
  IsIncluded?: boolean;
  IsActive?: boolean;
  FeeID?: number;
  FeeIsActive?: boolean;
  CreatedAt?: string;
  UpdatedAt?: string;

  // Alias pour compatibilité avec le formulaire
  id?: number;
  vcName?: string;
  vcContact?: string;
  vcPhoneNumber?: string;
  vcEmail?: string;
  vcCity?: string;
  vcCountry?: string;
  vcAddress?: string;
  vcLogoPath?: string;
  vcAccountName?: string;
  vcAccountNumber?: string;
  nFees?: number;
  btFeesUsePercent?: boolean;
  btFeesIncluded?: boolean;
  btEnabled?: boolean;
}

export interface MobileOperatorResponse {
  status: number;
  message: string;
  data?: any;
  errors?: any;
}
