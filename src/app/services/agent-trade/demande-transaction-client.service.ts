import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  DemandeTransactionInternationale,
  toutesLesDemandes,
} from '../../pages/agent-trade/data/demandes.data';

@Injectable({
  providedIn: 'root',
})
export class DemandeTransactionClientService {
  private demandes: DemandeTransactionInternationale[] = [...toutesLesDemandes];
  // 1. Ajoutez ces deux lignes ici :
  private transactionTraiteeSubject = new BehaviorSubject<number | null>(null);
  transactionTraitee$ = this.transactionTraiteeSubject.asObservable();

  private demandeSubject = new BehaviorSubject<
    DemandeTransactionInternationale[]
  >(this.demandes);
  demandes$ = this.demandeSubject.asObservable();
 
  constructor() {}

  // ======================================================
  // GET ALL
  // ======================================================

  getDemandes(): DemandeTransactionInternationale[] {
    return this.demandes;
  }

  // ======================================================
  // DEMANDES PAR ETAPE
  // ======================================================

  getDemandesAgentTrade() {
    return this.demandes.filter(
      (d) =>
        d.etapeValidation === 'AGENT_TRADE' ||
        d.etapeValidation === 'FINALISATION',
    );
  }

  getDemandesConformite() {
    return this.demandes.filter((d) => d.etapeValidation === 'CONFORMITE');
  }

  getDemandesDG() {
    return this.demandes.filter((d) => d.etapeValidation === 'DG_DGA');
  }

  // ======================================================
  // AGENT TRADE → CONFORMITE
  // ======================================================

  envoyerConformite(id: number): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'AGENT_TRADE') {
      return false;
    }

    demande.etapeValidation = 'CONFORMITE';
    demande.statutDemande = 'EN_ATTENTE';

    this.refresh();

    return true;
  }

  // ======================================================
  // CONFORMITE → DG ou FINALISATION
  // ======================================================

  validerConformite(id: number): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'CONFORMITE') {
      return false;
    }

    // AVEC PROCURATION
    if (demande.derogation) {
      demande.etapeValidation = 'DG_DGA';
    } else {
      // SANS PROCURATION
      demande.etapeValidation = 'FINALISATION';
    }

    demande.statutDemande = 'EN_ATTENTE';

    this.refresh();

    return true;
  }

  // ======================================================
  // REJET CONFORMITE
  // ======================================================

  rejeterConformite(id: number, motif: string): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'CONFORMITE') {
      return false;
    }

    demande.statutDemande = 'REJETE';
    demande.motifRejet = motif;

    this.refresh();

    return true;
  }

  // ======================================================
  // DG → FINALISATION
  // ======================================================

  validerDG(id: number): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'DG_DGA') {
      return false;
    }

    demande.etapeValidation = 'FINALISATION';

    this.refresh();

    return true;
  }

  // ======================================================
  // REJET DG
  // ======================================================

  rejeterDG(id: number, motif: string): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'DG_DGA') {
      return false;
    }

    demande.statutDemande = 'REJETE';
    demande.motifRejet = motif;

    this.refresh();

    return true;
  }

  // ======================================================
  // VALIDATION FINALE AGENT TRADE
  // ======================================================

  validerFinalement(id: number): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'FINALISATION') {
      return false;
    }

    demande.statutDemande = 'VALIDE';

    demande.dateValidation = new Date();

    this.refresh();

    return true;
  }

  // ======================================================
  // REJET FINAL AGENT TRADE
  // ======================================================

  rejeterFinalement(id: number, motif: string): boolean {
    const demande = this.find(id);

    if (!demande) return false;

    if (demande.etapeValidation !== 'FINALISATION') {
      return false;
    }

    demande.statutDemande = 'REJETE';

    demande.motifRejet = motif;

    this.refresh();

    return true;
  }

  // ======================================================
  // AJOUT
  // ======================================================

  ajouterDemande(demande: DemandeTransactionInternationale): void {
    this.demandes.push(demande);

    this.refresh();
  }

  // ======================================================
  // DELETE
  // ======================================================

  supprimerDemande(id: number): void {
    this.demandes = this.demandes.filter((d) => d.id !== id);

    this.refresh();
  }

  // ======================================================
  // FIND
  // ======================================================

  private find(id: number) {
    return this.demandes.find((d) => d.id === id);
  }

  // ======================================================
  // REFRESH
  // ======================================================

  private refresh(): void {
    this.demandeSubject.next([...this.demandes]);
  }
}
