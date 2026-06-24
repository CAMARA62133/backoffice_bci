export interface OperationBancaire {
  numero: number;
  devise: string;
  codeBanque: string;
  codeGuichet: string;
  numeroCompte: string;
  cleRib: string;
  nomClient: string;
  montant: number;
  motif: string;
}

export interface TransactionMultiple {
  id: number;
  reference: string;

  // Statut
  statutDemande:
    | 'Valide'
    | 'Rejete';
  typeTransaction: 'Salaire' | 'Prime' | 'Virement';
  motifRejet?: string;

  date: string;
  lieu: string;

  // 🔥 Nouveaux champs
  initiateur: string; // ex: "Admin Banque"
  nombreOperations: number; // ex: 35
  montantTotal: number; // ex: 150000000

  operations: OperationBancaire[];
}

export const TRANSACTIONS_MULTIPLES: TransactionMultiple[] = [


  // TRANSACTION 2 - FEVRIER (Validée)
  {
    id: 2,
    reference: 'TRX-SALAIRE-2026-02',
    statutDemande: 'Valide',
    typeTransaction: 'Salaire',
    date: '2026-02-28',
    lieu: 'Conakry',
    initiateur: 'Admin Banque',
    nombreOperations: 5,
    montantTotal: 57731507,
    operations: [
      {
        numero: 1,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106209101',
        cleRib: '35',
        nomClient: 'BILIVOGUI SIBA',
        montant: 18821208,
        motif: 'SALAIRE FEVRIER 2026',
      },
      {
        numero: 2,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104770501',
        cleRib: '61',
        nomClient: 'DIALLO THIERNO ALIOU',
        montant: 8853964,
        motif: 'SALAIRE FEVRIER 2026',
      },
      {
        numero: 3,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106192301',
        cleRib: '92',
        nomClient: 'DIALLO ABDOULAYE BANO',
        montant: 14257545,
        motif: 'SALAIRE FEVRIER 2026',
      },
      {
        numero: 4,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104810601',
        cleRib: '41',
        nomClient: 'DIALLO FANTA',
        montant: 8227888,
        motif: 'SALAIRE FEVRIER 2026',
      },
      {
        numero: 5,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106202801',
        cleRib: '20',
        nomClient: 'CAMARA ABOUBACAR OUMAR',
        montant: 7558902,
        motif: 'SALAIRE FEVRIER 2026',
      },
    ],
  },



  // TRANSACTION 4 - AVRIL (Rejetée)
  {
    id: 4,
    reference: 'TRX-SALAIRE-2026-04',
    statutDemande: 'Rejete',
    typeTransaction: 'Salaire',
    date: '2026-04-30',
    lieu: 'Conakry',
    initiateur: 'Admin Banque',
    nombreOperations: 5,
    montantTotal: 57731507,
    motifRejet: 'Fonds insuffisants sur le compte source',
    operations: [
      {
        numero: 1,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106209101',
        cleRib: '35',
        nomClient: 'BILIVOGUI SIBA',
        montant: 18821208,
        motif: 'SALAIRE AVRIL 2026',
      },
      {
        numero: 2,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104770501',
        cleRib: '61',
        nomClient: 'DIALLO THIERNO ALIOU',
        montant: 8853964,
        motif: 'SALAIRE AVRIL 2026',
      },
      {
        numero: 3,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106192301',
        cleRib: '92',
        nomClient: 'DIALLO ABDOULAYE BANO',
        montant: 14257545,
        motif: 'SALAIRE AVRIL 2026',
      },
      {
        numero: 4,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104810601',
        cleRib: '41',
        nomClient: 'DIALLO FANTA',
        montant: 8227888,
        motif: 'SALAIRE AVRIL 2026',
      },
      {
        numero: 5,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106202801',
        cleRib: '20',
        nomClient: 'CAMARA ABOUBACAR OUMAR',
        montant: 7558902,
        motif: 'SALAIRE AVRIL 2026',
      },
    ],
  },


  // TRANSACTION 6 - JUIN (Validée)
  {
    id: 6,
    reference: 'TRX-SALAIRE-2026-06',
    statutDemande: 'Valide',
    typeTransaction: 'Salaire',
    date: '2026-06-30',
    lieu: 'Conakry',
    initiateur: 'Admin Banque',
    nombreOperations: 5,
    montantTotal: 57731507,
    operations: [
      {
        numero: 1,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106209101',
        cleRib: '35',
        nomClient: 'BILIVOGUI SIBA',
        montant: 18821208,
        motif: 'SALAIRE JUIN 2026',
      },
      {
        numero: 2,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104770501',
        cleRib: '61',
        nomClient: 'DIALLO THIERNO ALIOU',
        montant: 8853964,
        motif: 'SALAIRE JUIN 2026',
      },
      {
        numero: 3,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106192301',
        cleRib: '92',
        nomClient: 'DIALLO ABDOULAYE BANO',
        montant: 14257545,
        motif: 'SALAIRE JUIN 2026',
      },
      {
        numero: 4,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104810601',
        cleRib: '41',
        nomClient: 'DIALLO FANTA',
        montant: 8227888,
        motif: 'SALAIRE JUIN 2026',
      },
      {
        numero: 5,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106202801',
        cleRib: '20',
        nomClient: 'CAMARA ABOUBACAR OUMAR',
        montant: 7558902,
        motif: 'SALAIRE JUIN 2026',
      },
    ],
  },

  // TRANSACTION 7 - JUILLET (Rejetée)
  {
    id: 7,
    reference: 'TRX-SALAIRE-2026-07',
    statutDemande: 'Rejete',
    typeTransaction: 'Salaire',
    date: '2026-07-31',
    lieu: 'Conakry',
    initiateur: 'Admin Banque',
    nombreOperations: 5,
    montantTotal: 57731507,
    motifRejet: 'Compte bénéficiaire invalide pour certains employés',
    operations: [
      {
        numero: 1,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106209101',
        cleRib: '35',
        nomClient: 'BILIVOGUI SIBA',
        montant: 18821208,
        motif: 'SALAIRE JUILLET 2026',
      },
      {
        numero: 2,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104770501',
        cleRib: '61',
        nomClient: 'DIALLO THIERNO ALIOU',
        montant: 8853964,
        motif: 'SALAIRE JUILLET 2026',
      },
      {
        numero: 3,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106192301',
        cleRib: '92',
        nomClient: 'DIALLO ABDOULAYE BANO',
        montant: 14257545,
        motif: 'SALAIRE JUILLET 2026',
      },
      {
        numero: 4,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104810601',
        cleRib: '41',
        nomClient: 'DIALLO FANTA',
        montant: 8227888,
        motif: 'SALAIRE JUILLET 2026',
      },
      {
        numero: 5,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106202801',
        cleRib: '20',
        nomClient: 'CAMARA ABOUBACAR OUMAR',
        montant: 7558902,
        motif: 'SALAIRE JUILLET 2026',
      },
    ],
  },

  // TRANSACTION 9 - SEPTEMBRE (Validée)
  {
    id: 9,
    reference: 'TRX-SALAIRE-2026-09',
    statutDemande: 'Valide',
    typeTransaction: 'Salaire',
    date: '2026-09-30',
    lieu: 'Conakry',
    initiateur: 'Admin Banque',
    nombreOperations: 5,
    montantTotal: 57731507,
    operations: [
      {
        numero: 1,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106209101',
        cleRib: '35',
        nomClient: 'BILIVOGUI SIBA',
        montant: 18821208,
        motif: 'SALAIRE SEPTEMBRE 2026',
      },
      {
        numero: 2,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104770501',
        cleRib: '61',
        nomClient: 'DIALLO THIERNO ALIOU',
        montant: 8853964,
        motif: 'SALAIRE SEPTEMBRE 2026',
      },
      {
        numero: 3,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106192301',
        cleRib: '92',
        nomClient: 'DIALLO ABDOULAYE BANO',
        montant: 14257545,
        motif: 'SALAIRE SEPTEMBRE 2026',
      },
      {
        numero: 4,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '017',
        numeroCompte: '1104810601',
        cleRib: '41',
        nomClient: 'DIALLO FANTA',
        montant: 8227888,
        motif: 'SALAIRE SEPTEMBRE 2026',
      },
      {
        numero: 5,
        devise: 'GNF',
        codeBanque: '006',
        codeGuichet: '016',
        numeroCompte: '1106202801',
        cleRib: '20',
        nomClient: 'CAMARA ABOUBACAR OUMAR',
        montant: 7558902,
        motif: 'SALAIRE SEPTEMBRE 2026',
      },
    ],
  },


];
