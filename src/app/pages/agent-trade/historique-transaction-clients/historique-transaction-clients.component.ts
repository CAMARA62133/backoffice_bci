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
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './historique-transaction-clients.component.html',
  styleUrl: './historique-transaction-clients.component.css',
})
export class HistoriqueTransactionClientsComponent implements OnInit {
  activeTab: string = 'validees';
  isLoadingDemandes: boolean = false;
  toutesLesDemandes: DemandeTransactionInternationale[] = [];

  pageSize = 10;
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  searchText: string = '';
  dateDebut: string = '';
  dateFin: string = '';
  filtreDerogation: string = '';

  public utils = inject(UtilsService);
  public notification = inject(NotificationService);

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.isLoadingDemandes = true;
    setTimeout(() => {
      this.toutesLesDemandes = [...toutesLesDemandes];
      this.isLoadingDemandes = false;
    }, 500);
  }

  // Transactions validées uniquement
  // Ajoutez ces getters dans votre composant

  get toutesTransactions(): DemandeTransactionInternationale[] {
    return this.toutesLesDemandes.filter(
      (d) => d.statutDemande === 'Valide' || d.statutDemande === 'Rejete',
    );
  }

  // Transactions validées
  get transactionsValidees(): DemandeTransactionInternationale[] {
    return this.toutesLesDemandes.filter((d) => d.statutDemande === 'Valide');
  }

  // Transactions rejetées
  get transactionsRejetees(): DemandeTransactionInternationale[] {
    return this.toutesLesDemandes.filter((d) => d.statutDemande === 'Rejete');
  }



  // Données selon l'onglet actif
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

  get filteredData(): DemandeTransactionInternationale[] {
    let data = [...this.currentData];

    // Filtre recherche texte
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

    // Filtre date début
    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      data = data.filter((item) => new Date(item.dtCreated) >= debut);
    }

    // Filtre date fin
    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setHours(23, 59, 59);
      data = data.filter((item) => new Date(item.dtCreated) <= fin);
    }

    // Filtre dérogation
    if (this.filtreDerogation === 'avec') {
      data = data.filter((item) => item.estDerogation === true);
    } else if (this.filtreDerogation === 'sans') {
      data = data.filter((item) => item.estDerogation !== true);
    }

    // Tri
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
          return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal
            .toLowerCase()
            .localeCompare(bVal.toLowerCase());
          return this.sortDirection === 'asc' ? comparison : -comparison;
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
    this.filtreDerogation = '';
    this.currentPage = 1;
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.notification.info('Filtres réinitialisés');
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
    this.currentPage = 1;
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.filtreDerogation = '';
  }

  isActive(tabName: string) {
    return this.activeTab === tabName;
  }
}
