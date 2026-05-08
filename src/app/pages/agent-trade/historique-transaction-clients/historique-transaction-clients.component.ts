import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils/table-utils.service';
import { NotificationService } from '../../../services/notification/notification.service';
import {
  DemandeTransactionInternationale,
  toutesLesDemandes,
} from '../data/demandes.data';

@Component({
  selector: 'app-historique-transaction-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './historique-transaction-clients.component.html',
  styleUrl: './historique-transaction-clients.component.css',
})
export class HistoriqueTransactionClientsComponent implements OnInit {
  activeTab: 'toutes' | 'validees' | 'rejetees' = 'validees';
  isLoadingDemandes = false;

  toutesLesDemandes: DemandeTransactionInternationale[] = [];

  pageSize = 10;
  currentPage = 1;

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  searchText = '';
  dateDebut = '';
  dateFin = '';
  filtreDerogation = '';

  public utils = inject(UtilsService);
  public notification = inject(NotificationService);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoadingDemandes = true;

    setTimeout(() => {
      this.toutesLesDemandes = [...toutesLesDemandes];
      this.isLoadingDemandes = false;
    }, 500);
  }

  // =========================
  // FILTRES PAR STATUT
  // =========================

  get toutesTransactions(): DemandeTransactionInternationale[] {
    return this.toutesLesDemandes.filter(
      (d) => d.statutDemande === 'VALIDE' || d.statutDemande === 'REJETE',
    );
  }

  get transactionsValidees(): DemandeTransactionInternationale[] {
    return this.toutesLesDemandes.filter((d) => d.statutDemande === 'VALIDE');
  }

  get transactionsRejetees(): DemandeTransactionInternationale[] {
    return this.toutesLesDemandes.filter((d) => d.statutDemande === 'REJETE');
  }

  // =========================
  // DATA ACTIF
  // =========================

  get currentData(): DemandeTransactionInternationale[] {
    switch (this.activeTab) {
      case 'toutes':
        return this.toutesTransactions;
      case 'validees':
        return this.transactionsValidees;
      case 'rejetees':
        return this.transactionsRejetees;
      default:
        return this.toutesTransactions;
    }
  }

  // =========================
  // FILTRAGE GLOBAL
  // =========================

  get filteredData(): DemandeTransactionInternationale[] {
    let data = [...this.currentData];

    // SEARCH
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();

      data = data.filter(
        (item) =>
          item.raisonSocialeDO?.toLowerCase().includes(search) ||
          item.raisonSocialeB?.toLowerCase().includes(search) ||
          item.refDocument?.toLowerCase().includes(search) ||
          item.typeTransaction?.toLowerCase().includes(search),
      );
    }

    // DATE DEBUT
    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      data = data.filter((item) => new Date(item.dtCreated) >= debut);
    }

    // DATE FIN
    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setHours(23, 59, 59, 999);

      data = data.filter((item) => new Date(item.dtCreated) <= fin);
    }

    // DÉROGATION (CORRIGÉ)
    if (this.filtreDerogation === 'avec') {
      data = data.filter((item) => item.derogation === true);
    }

    if (this.filtreDerogation === 'sans') {
      data = data.filter((item) => item.derogation === false);
    }

    // TRI SÉCURISÉ
    if (this.sortColumn) {
      data.sort((a, b) => {
        const aVal = (a as any)[this.sortColumn];
        const bVal = (b as any)[this.sortColumn];

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // DATE
        if (
          this.sortColumn === 'dtCreated' ||
          this.sortColumn === 'dateValidation'
        ) {
          return this.sortDirection === 'asc'
            ? new Date(aVal).getTime() - new Date(bVal).getTime()
            : new Date(bVal).getTime() - new Date(aVal).getTime();
        }

        // NUMBER
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }

        // STRING
        return this.sortDirection === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return data;
  }

  // =========================
  // PAGINATION
  // =========================

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
    const max = 5;
    const half = Math.floor(max / 2);

    if (this.totalPages <= max) {
      for (let i = 1; i <= this.totalPages; i++) range.push(i);
      return range;
    }

    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + max - 1);

    if (end - start < max) {
      start = Math.max(1, end - max + 1);
    }

    if (start > 1) {
      range.push(1);
      if (start > 2) range.push('...');
    }

    for (let i = start; i <= end; i++) range.push(i);

    if (end < this.totalPages) {
      if (end < this.totalPages - 1) range.push('...');
      range.push(this.totalPages);
    }

    return range;
  }

  // =========================
  // ACTIONS
  // =========================

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

  // =========================
  // RESET
  // =========================

  resetFilters(): void {
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.filtreDerogation = '';
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.currentPage = 1;

    this.notification.info('Filtres réinitialisés');
  }

  setActiveTab(tab: 'toutes' | 'validees' | 'rejetees'): void {
    this.activeTab = tab;
    this.currentPage = 1;

    this.resetFilters();
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
