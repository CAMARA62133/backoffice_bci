export interface RejectionReason {
  id: number;
  iModuleID: number;
  vcReason: string;
}

export interface RejectRaisonApiResponse {
  status: number;
  message: string;
  data: {
    reasons: RejectionReason[];
  };
}
