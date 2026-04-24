

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../../services/utils/table-utils.service';
import { NotificationService } from '../../../services/notification/notification.service';
import {
  DemandeTransactionInternationale,
} from '../data/demandes.data';
import { DemandeTransactionClientService } from '../../../services/agent-trade/demande-transaction-client.service';

@Component({
  selector: 'app-transaction-internationale-procuration',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transaction-internationale-procuration.component.html',
  styleUrl: './transaction-internationale-procuration.component.css',
})
export class TransactionInternationaleProcurationComponent implements OnInit, OnDestroy {
  isLoadingDemandes: boolean = false;
  demandes: DemandeTransactionInternationale[] = [];

  pageSize = 10;
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  searchText: string = '';
  dateDebut: string = '';
  dateFin: string = '';

  public utils = inject(UtilsService);
  public notification = inject(NotificationService);
  private transactionService = inject(DemandeTransactionClientService);
  private subscription!: Subscription;

  constructor() {}

  ngOnInit() {
    this.loadData();

    // Écouter les transactions traitées
    this.subscription = this.transactionService.transactionTraitee$.subscribe(
      (id) => {
        this.supprimerTransaction(id);
      },
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadData(): void {
    this.isLoadingDemandes = true;

    setTimeout(() => {
      this.demandes = this.transactionService
        .getDemandes()
        .filter((d) => d.statutDemande === 'En traitement');

      this.isLoadingDemandes = false;
    }, 300);
  }

  // Supprimer une transaction de la liste
  private supprimerTransaction(id: number): void {
    const index = this.demandes.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.notification.success('Transaction traitée avec succès');

      // Réinitialiser la pagination si la page est vide
      if (this.demandes.length === 0) {
        this.currentPage = 1;
      } else if (this.paginatedData.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }

  // ==========================================
  // LOGIQUE DE TABLE (reste identique)
  // ==========================================
  get filteredData(): DemandeTransactionInternationale[] {
    let data = [...this.demandes];

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      data = data.filter(
        (item) =>
          item.raisonSocialeDO?.toLowerCase().includes(searchLower) ||
          item.raisonSocialeB?.toLowerCase().includes(searchLower) ||
          item.refDocument?.toLowerCase().includes(searchLower) ||
          item.typeTransaction?.toLowerCase().includes(searchLower),
      );
    }

    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      data = data.filter((item) => new Date(item.dtCreated) >= debut);
    }

    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setHours(23, 59, 59);
      data = data.filter((item) => new Date(item.dtCreated) <= fin);
    }

    if (this.sortColumn) {
      data.sort((a, b) => {
        let aVal = a[this.sortColumn as keyof DemandeTransactionInternationale];
        let bVal = b[this.sortColumn as keyof DemandeTransactionInternationale];

        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;

        if (this.sortColumn === 'dtCreated') {
          aVal = new Date(aVal as Date).getTime();
          bVal = new Date(bVal as Date).getTime();
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
          if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
          return 0;
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          const aStr = aVal.toLowerCase();
          const bStr = bVal.toLowerCase();
          if (aStr < bStr) return this.sortDirection === 'asc' ? -1 : 1;
          if (aStr > bStr) return this.sortDirection === 'asc' ? 1 : -1;
          return 0;
        }
        return 0;
      });
    }

    return data;
  }

  get paginatedData(): DemandeTransactionInternationale[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
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

  get startIndex(): number {
    if (this.filteredData.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredData.length);
  }

  onPageClick(page: number | string): void {
    if (typeof page === 'number') this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  sort(col: string): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'fas fa-sort';
    return this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }

  resetFilters(): void {
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.currentPage = 1;
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.notification.info('Filtres réinitialisés');
  }
}
