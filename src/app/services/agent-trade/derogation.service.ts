// derogation-workflow.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DemandeTransactionInternationale,
  toutesLesDemandes,
} from '../../pages/agent-trade/data/demandes.data';

export type UserRole = 'AdminIntegrateurBanque' | 'TradeAgent' | 'Client';

@Injectable({ providedIn: 'root' })
export class DerogationService {
  private derogations: Map<number, DemandeTransactionInternationale> =
    new Map();
  private demandesDerogation = new BehaviorSubject<
    DemandeTransactionInternationale[]
  >([]);

  constructor() {
    this.initMockData();
  }

  private initMockData(): void {
    // Utiliser toutesLesDemandes importées
    const toutesLesDemandesList = [...toutesLesDemandes];

    // Ne garder que les demandes avec dérogation
    const mockDerogations = toutesLesDemandesList.filter(
      (d) => d.estDerogation === true,
    );

    mockDerogations.forEach((d) => this.derogations.set(d.id, d));
    this.demandesDerogation.next(mockDerogations);
  }

  getDemandesDerogation(): Observable<DemandeTransactionInternationale[]> {
    return this.demandesDerogation.asObservable();
  }

  // Obtenir toutes les demandes (avec et sans dérogation)
  getToutesLesDemandes(): DemandeTransactionInternationale[] {
    return Array.from(this.derogations.values());
  }

  // Obtenir les demandes en attente de validation (pour Admin Banque)
  getDemandesEnAttenteValidation(): DemandeTransactionInternationale[] {
    return Array.from(this.derogations.values()).filter(
      (d) => d.estDerogation && d.statutDemande === 'En attente validation',
    );
  }

  // Obtenir les demandes validées et prêtes pour traitement (pour Trade Agent)
  getDemandesValideesPretes(): DemandeTransactionInternationale[] {
    return Array.from(this.derogations.values()).filter(
      (d) =>
        d.estDerogation &&
        d.statutDemande === 'En traitement' &&
        d.valideParAdminBanque === true,
    );
  }

  // Pour Admin Intégrateur Banque - Valider une dérogation
  validerDerogation(id: number, commentaire?: string): Observable<boolean> {
    return new Observable((subscriber) => {
      const demande = this.derogations.get(id);
      if (
        demande &&
        demande.estDerogation &&
        demande.statutDemande === 'En attente validation'
      ) {
        demande.statutDemande = 'En traitement';
        demande.valideParAdminBanque = true;
        demande.dateValidation = new Date();
        demande.commentaireValidation = commentaire;
        this.derogations.set(id, demande);
        this.refreshList();
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  // Pour Admin Intégrateur Banque - Rejeter une dérogation
  rejeterDerogation(id: number, motif: string): Observable<boolean> {
    return new Observable((subscriber) => {
      const demande = this.derogations.get(id);
      if (
        demande &&
        demande.estDerogation &&
        demande.statutDemande === 'En attente validation'
      ) {
        demande.statutDemande = 'Rejete';
        demande.motifRejet = motif;
        demande.valideParAdminBanque = false;
        this.derogations.set(id, demande);
        this.refreshList();
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  // Pour Trade Agent - Marquer comme traitée
  marquerCommeTraitee(id: number): Observable<boolean> {
    return new Observable((subscriber) => {
      const demande = this.derogations.get(id);
      if (
        demande &&
        demande.estDerogation &&
        demande.statutDemande === 'En traitement' &&
        demande.valideParAdminBanque === true
      ) {
        demande.statutDemande = 'Valide';
        this.derogations.set(id, demande);
        this.refreshList();
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  // Mettre à jour une demande existante
  mettreAJourDemande(demande: DemandeTransactionInternationale): void {
    this.derogations.set(demande.id, demande);
    this.refreshList();
  }

  // Ajouter une nouvelle demande avec dérogation
  ajouterDemandeAvecDerogation(
    demande: DemandeTransactionInternationale,
  ): void {
    this.derogations.set(demande.id, demande);
    this.refreshList();
  }

  private refreshList(): void {
    const list = Array.from(this.derogations.values());
    this.demandesDerogation.next(list);
  }
}
