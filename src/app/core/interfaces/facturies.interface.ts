// ==============================
// INTERFACES DE BASE
// ==============================

/**
 * Données de contact communes à toutes les interfaces
 */
interface ContactInfo {
  vcContact: string;
  vcPhoneNumber: string;
  vcEmail: string;
  vcCity: string;
  vcCountry: string;
  vcAddress: string;
  vcLogoPath: string;
  vcAccountName: string;
  vcAccountNumber: string;
}

/**
 * Configuration des frais communes
 */
interface FeesConfig {
  nFeesBank: number;
  nFees: number;
}

// ==============================
// INTERFACES SPÉCIFIQUES
// ==============================

/**
 * Interface pour le listing (API Response)
 */

export interface FacturierListing extends ContactInfo, FeesConfig {
  id: number;
  FacturierName: string;
  FeesEnabled: boolean;
  btEnabled: boolean;
  btFeesBankUsePercent: number;
  btFeesIncluded: number;
  btFeesUsePercent: number;
  dtCreated: string;
  dtLastUpdate: string;
}

/**
 * Interface pour la mise à jour (Update)
 */
export interface FacturierUpdate extends ContactInfo, FeesConfig {
  // Champs spécifiques à la mise à jour
  vcName: string;
  logo: string;
  btFeesBankUsePercent: number;
  btFeesUsePercent: number;
  btFeesIncluded: number;
  iMerchandID: number;
}

/**
 * Interface pour la création (Create)
 */
// type FacturierCreate = Omit<FacturierUpdate, 'iMerchandID'>;
// OU de manière explicite :
export interface FacturierCreateExplicit extends ContactInfo, FeesConfig {
  vcName: string;
  btFeesBankUsePercent: number;
  btFeesUsePercent: number;
  btFeesIncluded: number;
}

export interface FacturierToggleStatus {
  iMerchandID: number;
  btEnabled: number;
}
