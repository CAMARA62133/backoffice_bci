export interface CompteClient {
  compte: string;
  agence: string;
  devise: string;
  posdisp: number;
  posdev: number;
  typ: string;
  nomCompte: string;
  datfrm: string | null;
  agencelib: string;
  datouv: string;
  isBlocked: boolean;
  isBlockedDetails: string;
}

export interface ClientAccountResponse {
  status: number;
  message: string;
  clientDetails: any | null;
  comptes: CompteClient[];
}
