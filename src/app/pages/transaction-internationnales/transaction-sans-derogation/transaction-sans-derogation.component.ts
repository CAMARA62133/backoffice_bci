import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TransactionInternationale } from '../data/transaction-internationnale.data';
import { DemandeTransactionClientService } from '../../../services/agent-trade/demande-transaction-client.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { SkeletonLoaderComponent } from '../../../shared/skeleton/skeleton-loader.component';
@Component({
  selector: 'app-transaction-sans-derogation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SkeletonLoaderComponent],
  templateUrl: './transaction-sans-derogation.component.html',
  styleUrl: './transaction-sans-derogation.component.css',
})
export class TransactionSansDerogationComponent implements OnInit, OnDestroy {
  demandes: TransactionInternationale[] = [];
  isLoading = false;

  // Pagination
  pageSize = 10;
  currentPage = 1;

  // Tri
  sortColumn: keyof TransactionInternationale | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtres
  searchText = '';
  dateDebut = '';
  dateFin = '';

  // Rôle actuel (à définir selon l'utilisateur connecté)
  currentRole: 'AGENT_TRADE' | 'CONFORMITE' = 'AGENT_TRADE';

  private transactionService = inject(DemandeTransactionClientService);
  private notification = inject(NotificationService);
  private subscription!: Subscription;

  countAgentTrade: number = 0;
  countConformite: number = 0;

  ngOnInit(): void {
    this.loadData();
    this.calculerCompteurs();

    this.subscription = this.transactionService.transactionTraitee$.subscribe(
      (id) => {
        this.supprimerTransaction(id!);
        this.calculerCompteurs();
      },
    );
  }

  calculerCompteurs() {
    const toutesLesDemandes = this.transactionService.getDemandes();

    const demandesSansDerogation = toutesLesDemandes.filter(
      (d) => d.derogation === false,
    );

    this.countAgentTrade = demandesSansDerogation.filter(
      (d) =>
        (d.etapeValidation === 'AGENT_TRADE' ||
          d.etapeValidation === 'FINALISATION') &&
        d.statutDemande === 'EN_ATTENTE',
    ).length;

    this.countConformite = demandesSansDerogation.filter(
      (d) =>
        d.etapeValidation === 'CONFORMITE' && d.statutDemande === 'EN_ATTENTE',
    ).length;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadData(): void {
    this.isLoading = true;

    setTimeout(() => {
      const toutesLesDemandes = this.transactionService.getDemandes();

      this.demandes = toutesLesDemandes.filter((d) => {
        if (d.derogation !== false) return false;
        if (d.statutDemande !== 'EN_ATTENTE') return false;

        switch (this.currentRole) {
          case 'AGENT_TRADE':
            return (
              d.etapeValidation === 'AGENT_TRADE' ||
              d.etapeValidation === 'FINALISATION'
            );
          case 'CONFORMITE':
            return d.etapeValidation === 'CONFORMITE';
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

  getValidationLabel(demande: TransactionInternationale): string {
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
        return '✓ Valider';
      default:
        return 'Valider';
    }
  }

  // ==========================================
  // FILTRAGE
  // ==========================================

  get filteredData(): TransactionInternationale[] {
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
          a[this.sortColumn as keyof TransactionInternationale];
        const valB =
          b[this.sortColumn as keyof TransactionInternationale];

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

  get paginatedData(): TransactionInternationale[] {
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

  sort(column: keyof TransactionInternationale): void {
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

  changerRole(role: 'AGENT_TRADE' | 'CONFORMITE'): void {
    this.currentRole = role;
    this.currentPage = 1;
    this.loadData();
  }
}
