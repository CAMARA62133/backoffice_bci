// Interface générique pour toutes les réponses API
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// Modèle pour les transactions classiques (Locales)
export interface Transaction {
  dtCreated: string;
  Reference: string;
  UserFullName: string | null;
  PayerName: string;
  OrganisationName: string;
  BenefName: string;
  PaymentModeName: string | null;
  Amount: number;
  mAmountConverted: null;
  debiteurCurrency: string;
  BenefCurrency: string;
  nRate: null;
  Status: string | null;
  iRequestID: string | null;
  description: string;
}

// Modèle complet pour les transactions Internationales
export interface TransactionInternational {
  iRequestID: string;
  TransactionID: string;
  Reference: string;
  PayerAccount: string;
  PayerName: string;
  BenefName: string;
  BenefAccount: string;
  BenefBIC: string;
  BenefCurrency: string;
  debiteurCurrency: string;
  CorrespBIC: string | null;
  vcSenderBankName: string;
  vcReceiverBankName: string;
  vcCorrespBankName: string | null;
  vcOperatorAccountName: string | null;
  vcMerchandAccountName: string | null;
  nRate: string;
  mAmountConverted: string;
  mFeesConverted: string | null;
  mFeesBankConverted: string | null;
  Amount: string;
  OperatorAccount: string | null;
  FeesECash: string | null;
  FeesBCI: string | null;
  FeesIncluded: string | null;
  Notes: string | null;
  TypeTransaction: string;
  Status: string | null;
  OrganisationID: string;
  OrganisationName: string;
  UserID: string;
  UserFullName: string;
  PaymentModeID: string;
  PaymentModeName: string;
  dtCreated: string;

}
