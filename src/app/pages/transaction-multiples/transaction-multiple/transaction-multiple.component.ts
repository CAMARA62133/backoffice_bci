import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils/table-utils.service';
import { NotificationService } from '../../../services/notification/notification.service';
import {
  TransactionMultiple,
  TRANSACTIONS_MULTIPLES,
} from '../data/transaction-multile.data';

@Component({
  selector: 'app-transaction-multiple',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transaction-multiple.component.html',
  styleUrl: './transaction-multiple.component.css',
})
export class TransactionMultipleComponent implements OnInit {
  isLoadingDemandes: boolean = false;
  toutesTransactions: TransactionMultiple[] = TRANSACTIONS_MULTIPLES;


  pageSize = 10;
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  searchText: string = '';
  dateDebut: string = '';
  dateFin: string = '';

  public utils = inject(UtilsService);
  public notification = inject(NotificationService);

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.isLoadingDemandes = true;
    setTimeout(() => {
      this.isLoadingDemandes = false;
    }, 300);
  }

  get transactionsValidees(): TransactionMultiple[] {
    return this.toutesTransactions;
  }








  // ==========================================
  // LOGIQUE DE TABLE
  // ==========================================
  get filteredData(): TransactionMultiple[] {
    let data = [...this.toutesTransactions];

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      data = data.filter(
        (item) =>
          item.reference?.toLowerCase().includes(searchLower) ||
          item.initiateur?.toLowerCase().includes(searchLower) ||
          item.typeTransaction?.toLowerCase().includes(searchLower),
      );
    }

    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      data = data.filter((item) => new Date(item.date) >= debut);
    }

    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setHours(23, 59, 59);
      data = data.filter((item) => new Date(item.date) <= fin);
    }

    if (this.sortColumn) {
      data.sort((a, b) => {
        let aVal = a[this.sortColumn as keyof TransactionMultiple];
        let bVal = b[this.sortColumn as keyof TransactionMultiple];

        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;

        if (this.sortColumn === 'date') {
          aVal = new Date(aVal as string).getTime();
          bVal = new Date(bVal as string).getTime();
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

  get paginatedData(): TransactionMultiple[] {
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
