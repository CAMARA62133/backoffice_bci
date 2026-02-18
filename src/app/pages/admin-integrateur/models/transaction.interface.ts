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
  BenefCurrency:string;
  nRate: null;
 
  Status: string | null;
  iRequestID: string | null;
  description: string;
}

export interface TransactionResponse {
  status: number;
  message: string;
  data: Transaction[];
}
