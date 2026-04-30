import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandeTransactionInternationale } from '../data/demandes.data';
import { NotificationService } from '../../../services/notification/notification.service';
import { DerogationService } from '../../../services/agent-trade/derogation.service';

@Component({
  selector: 'app-validation-transaction-procuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validation-transaction-procuration.component.html',
  styleUrl: './validation-transaction-procuration.component.css',
})
export class ValidationTransactionProcurationComponent implements OnInit {
  private workflowService = inject(DerogationService);
  private notification = inject(NotificationService);

  demandesEnAttente: DemandeTransactionInternationale[] = [];
  demandeSelectionnee: DemandeTransactionInternationale | null = null;
  showValidationModal = false;
  showRejetModal = false;
  commentaire = '';
  motifRejet = '';
  isLoading = false;
  motifRejetTouched = false;

  // Pagination et filtres
  pageSize = 10;
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';
  dateDebut: string = '';
  dateFin: string = '';

  ngOnInit() {
    this.chargerDemandes();
  }

  chargerDemandes() {
    this.isLoading = true;

    setTimeout(() => {
      this.demandesEnAttente =
        this.workflowService.getDemandesEnAttenteValidation();
      this.isLoading = false;
    }, 300);
  }

  // ==========================================
  // LOGIQUE DE TABLE
  // ==========================================
  get filteredData(): DemandeTransactionInternationale[] {
    let data = [...this.demandesEnAttente];

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      data = data.filter(
        (item) =>
          item.raisonSocialeDO?.toLowerCase().includes(searchLower) ||
          item.raisonSocialeB?.toLowerCase().includes(searchLower) ||
          item.motifEconomique?.toLowerCase().includes(searchLower) ||
          item.refDocument?.toLowerCase().includes(searchLower),
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

  // ==========================================
  // MODALS VALIDATION / REJET
  // ==========================================
  ouvrirModalValidation(demande: DemandeTransactionInternationale) {
    this.demandeSelectionnee = demande;
    this.commentaire = '';
    this.showValidationModal = true;
  }

  fermerModal() {
    this.showValidationModal = false;
    this.demandeSelectionnee = null;
  }

  confirmerValidation() {
    if (!this.demandeSelectionnee) return;
    this.isLoading = true;

    this.workflowService
      .validerDerogation(this.demandeSelectionnee.id, this.commentaire)
      .subscribe({
        next: (success) => {
          if (success) {
            this.notification.success('Dérogation validée avec succès');
            this.chargerDemandes();
            this.fermerModal();
          } else {
            this.notification.error('Erreur lors de la validation');
          }
          this.isLoading = false;
        },
        error: () => {
          this.notification.error('Erreur technique');
          this.isLoading = false;
        },
      });
  }

  ouvrirModalRejet(demande: DemandeTransactionInternationale) {
    this.demandeSelectionnee = demande;
    this.motifRejet = '';
    this.motifRejetTouched = false;
    this.showRejetModal = true;
  }

  fermerModalRejet() {
    this.showRejetModal = false;
    this.demandeSelectionnee = null;
  }

  confirmerRejet() {
    if (!this.demandeSelectionnee || !this.motifRejet) {
      this.motifRejetTouched = true;
      return;
    }
    this.isLoading = true;

    this.workflowService
      .rejeterDerogation(this.demandeSelectionnee.id, this.motifRejet)
      .subscribe({
        next: (success) => {
          if (success) {
            this.notification.warning('Dérogation rejetée');
            this.chargerDemandes();
            this.fermerModalRejet();
          } else {
            this.notification.error('Erreur lors du rejet');
          }
          this.isLoading = false;
        },
        error: () => {
          this.notification.error('Erreur technique');
          this.isLoading = false;
        },
      });
  }
}
