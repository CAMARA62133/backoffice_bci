import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DemandeTransactionInternationale } from '../data/demandes.data';
import { DemandeTransactionClientService } from '../../../services/agent-trade/demande-transaction-client.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-transaction-par-procuration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transaction-par-procuration.component.html',
  styleUrl: './transaction-par-procuration.component.css',
})
export class TransactionParProcurationComponent implements OnInit, OnDestroy {
  demandes: DemandeTransactionInternationale[] = [];
  isLoading = false;

  // Pagination
  pageSize = 10;
  currentPage = 1;

  // Tri
  sortColumn: keyof DemandeTransactionInternationale | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtres
  searchText = '';
  dateDebut = '';
  dateFin = '';

  // Rôle actuel (à définir selon l'utilisateur connecté)
  currentRole: 'AGENT_TRADE' | 'CONFORMITE' | 'DG_DGA' = 'AGENT_TRADE';
  countAgentTrade = 0;
  countConformite = 0;
  countDG = 0;
  private transactionService = inject(DemandeTransactionClientService);
  private notification = inject(NotificationService);
  private subscription!: Subscription;

  ngOnInit(): void {
    this.loadData();

    this.subscription = this.transactionService.transactionTraitee$.subscribe(
      (id) => {
        this.supprimerTransaction(id!);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  calculerCompteurs() {
    const toutesLesDemandes = this.transactionService.getDemandes();

    // Note : Ici on filtre selon votre besoin (avec ou sans procuration)
    // Si cette page est dédiée AUX procurations, utilisez d.derogation === true
    const demandesCiblees = toutesLesDemandes.filter(
      (d) => d.derogation === true,
    );

    this.countAgentTrade = demandesCiblees.filter(
      (d) =>
        (d.etapeValidation === 'AGENT_TRADE' ||
          d.etapeValidation === 'FINALISATION') &&
        d.statutDemande === 'EN_ATTENTE',
    ).length;

    this.countConformite = demandesCiblees.filter(
      (d) =>
        d.etapeValidation === 'CONFORMITE' && d.statutDemande === 'EN_ATTENTE',
    ).length;

    this.countDG = demandesCiblees.filter(
      (d) => d.etapeValidation === 'DG_DGA' && d.statutDemande === 'EN_ATTENTE',
    ).length;
  }
  private loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      const toutesLesDemandes = this.transactionService.getDemandes();

      this.demandes = toutesLesDemandes.filter((d) => {
        // On ne prend que les dossiers AVEC procuration/dérogation
        if (d.derogation !== true) return false;
        if (d.statutDemande !== 'EN_ATTENTE') return false;

        switch (this.currentRole) {
          case 'AGENT_TRADE':
            return (
              d.etapeValidation === 'AGENT_TRADE' ||
              d.etapeValidation === 'FINALISATION'
            );
          case 'CONFORMITE':
            return d.etapeValidation === 'CONFORMITE';
          case 'DG_DGA':
            return d.etapeValidation === 'DG_DGA';
          default:
            return false;
        }
      });

      this.calculerCompteurs();
      this.isLoading = false;
    }, 300);
  }

  private supprimerTransaction(id: number): void {
    const index = this.demandes.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.demandes.splice(index, 1);

      if (this.demandes.length === 0) {
        this.currentPage = 1;
      } else if (this.paginatedData.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }

  /**
   * Libellé du bouton de validation selon le rôle et l'étape
   */
  getValidationLabel(demande: DemandeTransactionInternationale): string {
    if (
      demande.etapeValidation === 'FINALISATION' &&
      this.currentRole === 'AGENT_TRADE'
    ) {
      return '✅ Valider définitivement';
    }

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        return '📤 Envoyer à la Conformité';
      case 'CONFORMITE':
        return '✓ Valider et envoyer à la DG/DGA';
      case 'DG_DGA':
        return '✓ Approuver';
      default:
        return 'Valider';
    }
  }

  /**
   * Libellé du prochain destinataire
   */
  getNextDestination(): string {
    switch (this.currentRole) {
      case 'AGENT_TRADE':
        return 'Conformité';
      case 'CONFORMITE':
        return 'DG/DGA';
      case 'DG_DGA':
        return 'finalisation';
      default:
        return '';
    }
  }

  // ==========================================
  // FILTRAGE
  // ==========================================

  get filteredData(): DemandeTransactionInternationale[] {
    let data = [...this.demandes];

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      data = data.filter(
        (d) =>
          d.raisonSocialeDO?.toLowerCase().includes(searchLower) ||
          d.raisonSocialeB?.toLowerCase().includes(searchLower) ||
          d.refDocument?.toLowerCase().includes(searchLower),
      );
    }

    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      debut.setHours(0, 0, 0, 0);
      data = data.filter((d) => new Date(d.dtCreated) >= debut);
    }

    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setHours(23, 59, 59, 999);
      data = data.filter((d) => new Date(d.dtCreated) <= fin);
    }

    if (this.sortColumn) {
      data.sort((a, b) => {
        const valA =
          a[this.sortColumn as keyof DemandeTransactionInternationale];
        const valB =
          b[this.sortColumn as keyof DemandeTransactionInternationale];

        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return this.sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();

        if (strA < strB) return this.sortDirection === 'asc' ? -1 : 1;
        if (strA > strB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }

  // ==========================================
  // PAGINATION
  // ==========================================

  get paginatedData(): DemandeTransactionInternationale[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get startIndex(): number {
    return this.filteredData.length === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredData.length);
  }

  get paginationRange(): (number | string)[] {
    const range: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) range.push(i);
    } else {
      let startPage = Math.max(1, this.currentPage - halfVisible);
      let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (startPage > 1) {
        range.push(1);
        if (startPage > 2) range.push('...');
      }

      for (let i = startPage; i <= endPage; i++) range.push(i);

      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) range.push('...');
        range.push(this.totalPages);
      }
    }
    return range;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  onPageClick(page: number | string): void {
    if (typeof page === 'number') this.currentPage = page;
  }

  // ==========================================
  // TRI
  // ==========================================

  sort(column: keyof DemandeTransactionInternationale): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'fas fa-sort';
    return this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }

  // ==========================================
  // UTILS
  // ==========================================

  resetFilters(): void {
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.currentPage = 1;
  }

  getEtapeLabel(etape: string): string {
    const labels: Record<string, string> = {
      AGENT_TRADE: 'Agent Trade',
      CONFORMITE: 'Conformité',
      DG_DGA: 'DG / DGA',
      FINALISATION: 'Finalisation',
    };
    return labels[etape] || etape;
  }

  getEtapeClass(etape: string): string {
    const classes: Record<string, string> = {
      AGENT_TRADE: 'bg-secondary',
      CONFORMITE: 'bg-info',
      DG_DGA: 'bg-warning',
      FINALISATION: 'bg-primary',
    };
    return classes[etape] || 'bg-secondary';
  }

  /**
   * Changer le rôle (pour tester)
   */
  changerRole(role: 'AGENT_TRADE' | 'CONFORMITE' | 'DG_DGA'): void {
    this.currentRole = role;
    this.currentPage = 1;
    this.loadData();
  }
}
