import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

// Services
import { HistoriqueTransactionService } from '../../../services/admin-integrateur/historique-transaction.service';
import { ExportService } from '../../../services/utils/export.service';

// Interfaces
import { Transaction } from '../models/transaction.interface';
import { UtilsService } from '../../../services/utils/table-utils.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { SkeletonLoaderComponent } from "../../../shared/skeleton/skeleton-loader.component";

@Component({
  selector: 'app-historique-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule, SkeletonLoaderComponent],
  templateUrl: './historique-transaction.component.html',
  styleUrl: './historique-transaction.component.css',
})
export class HistoriqueTransactionComponent implements OnInit {
  // --- Injections ---
  private historiqueService = inject(HistoriqueTransactionService);

  private exportService = inject(ExportService);
  public utils = inject(UtilsService);
  public notification = inject(NotificationService);
  // --- Données ---
  historiqueTransactions: Transaction[] = [];
  isLoading = false;
  listePaymentModes: string[] = [];
  // --- États des Filtres ---
  dateDebut: string = '';
  dateFin: string = '';
  paymentModeName: string = '';
  searchText = '';

  // --- Pagination & Tri ---
  pageSize = 5;
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // --- Modals & Actions ---
  selectedTransaction: any = null;
  isCancelling: boolean = false;

  ngOnInit(): void {
    this.loadHistorique();
  }

  // --- Chargement des données ---
  loadHistorique(): void {
    this.isLoading = true;
    this.historiqueService.getHistoriqueTransactions().subscribe({
      next: (response) => {
        this.historiqueTransactions = response.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'historique:", err);
        this.isLoading = false;
      },
    });
  }

  // ==========================================
  // LOGIQUE DE TABLE (FILTRAGE, TRI, PAGINATION)
  // ==========================================

  /** Retourne les données filtrées et triées */
  get filteredData(): Transaction[] {
    let data = [...this.historiqueTransactions];

    // 1. Filtre par plage de dates
    data = this.utils.filterByDateRange(
      data,
      'dtCreated',
      this.dateDebut,
      this.dateFin,
    );

    // 2. Filtre par mode de paiement
    data = this.utils.filterByValue(
      data,
      'PaymentModeName',
      this.paymentModeName,
    );

    // 3. Recherche globale
    data = this.utils.search(data, this.searchText);

    // 4. Tri
    return this.utils.sort(data, this.sortColumn, this.sortDirection);
  }

  /** Retourne uniquement les données de la page actuelle */
  get paginedTransaction(): Transaction[] {
    return this.utils.paginate(
      this.filteredData,
      this.currentPage,
      this.pageSize,
    );
  }

  // --- Actions de Navigation & Pagination ---

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get paginationRange(): (number | string)[] {
    return this.utils.getPaginationRange(this.currentPage, this.totalPages);
  }

  // --- Tri ---
  sort(col: string): void {
    this.sortDirection = this.utils.handleSort(
      col,
      this.sortColumn,
      this.sortDirection,
    );
    this.sortColumn = col;
  }

  get startIndex(): number {
    return this.utils.getStartIndex(
      this.currentPage,
      this.pageSize,
      this.filteredData.length,
    );
  }

  get endIndex(): number {
    return this.utils.getEndIndex(
      this.currentPage,
      this.pageSize,
      this.filteredData.length,
    );
  }

  // --- Navigation ---
  onPageClick(page: number | string): void {
    if (typeof page === 'number') this.currentPage = page;
  }

  previousPage() {
    this.currentPage = this.utils.getPreviousPage(this.currentPage);
  }

  nextPage() {
    this.currentPage = this.utils.getNextPage(
      this.currentPage,
      this.totalPages,
    );
  }

  resetFilters(): void {
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.paymentModeName = '';
    this.currentPage = 1;
    this.sortColumn = '';
    this.sortDirection = 'asc';

    this.loadHistorique();
    this.notification.info('Filtres réinitialisés');
  }

  exportPdf() {
    if (this.filteredData.length === 0) return;

    // 1. On définit les libellés des colonnes
    const headers = [
      [
        'Date',
        'Reference',
        'Prenom et nom',
        'Nom organisation',
        'Nom beneficiaire',
        'Type paiement',
        'Montant',
        'Montant converti',
        'Taux échange',
      ],
    ];
    const body = this.filteredData.map((d) => [
      new Date(d.dtCreated).toLocaleString(),
      d.Reference,
      d.UserFullName,
      d.OrganisationName,
      d.BenefName,
      d.PaymentModeName,
      d.Amount,
      d.mAmountConverted,
      d.nRate,
    ]);

    // 3. Appel du service
    this.exportService.exportToPdf(
      'Liste des transactions',
      headers,
      body,
      'transactions_export',
    );
  }

  exportExcel() {
    if (this.filteredData.length === 0) return;

    // Pour Excel, on crée un tableau d'objets avec des clés lisibles
    const dataForExcel = this.filteredData.map((d) => ({
      Date: new Date(d.dtCreated).toLocaleString(),
      Référence: d.Reference,
      'Prenom et nom': d.UserFullName,
      'Nom organisation': d.OrganisationName,
      'Nom beneficiaire': d.BenefName,
      'Type paiement': d.PaymentModeName,
      Montant: d.Amount,
      'Montant converti': d.mAmountConverted,
      'Taux échange': d.nRate,
    }));

    this.exportService.exportToExcel(dataForExcel, 'historique_transactions');
  }

  // ==========================================
  // ACTIONS MÉTIERS (ANNULATION, STATUT)
  // ==========================================

  openCancelModal(transaction: any): void {
    this.selectedTransaction = transaction;
  }

  closeModal(): void {
    this.selectedTransaction = null;
  }

  confirmCancel(): void {
    if (!this.selectedTransaction) return;

    this.isCancelling = true;
    this.historiqueService
      .cancelTransaction(this.selectedTransaction.iRequestID)
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.notification.success('Transaction annulée avec succès');
            this.loadHistorique();
          } else {
            const errorMsg =
              this.utils.decodeMessage(response.message) ||
              "Erreur lors de l'annulation";
            this.notification.error(errorMsg);
          }
          this.closeModal();
          this.isCancelling = false;
        },
        error: () => {
          this.notification.error('Une erreur technique est survenue.', '');
          this.isCancelling = false;
        },
      });
  }

  checkStatus(item: any): void {
    if (!item || !item.iRequestID) {
      this.notification.error(
        this.utils.decodeMessage(
          'Echec de verification  ,  ID TXN banque  introuvable',
        ),
      );
      return; // Empêche l'exécution de la suite si l'ID est manquant
    }
    item.isChecking = true;
    this.historiqueService
      .getTransactionStatus(item.iRequestID)
      .pipe(finalize(() => (item.isChecking = false)))
      .subscribe({
        next: (res: any) => {
          if (res && res.status === 200) {
            const nouveauStatut = res.Status;
            if (nouveauStatut !== item.Status) {
              item.Status = nouveauStatut;
              this.notification.success(
                `Statut mis à jour : ${this.utils.getStatusLabel(nouveauStatut)}`,
              );
              this.loadHistorique();
            } else {
              this.notification.info('Le statut n’a pas changé', '');
            }
          } else {
            this.notification.error(
              this.utils.decodeMessage(res?.message) ||
                'Le service est momentanément indisponible',
            );
          }
        },
        error: () =>
          this.notification.error('Connexion perdue ou impossible', ''),
      });
  }
}
