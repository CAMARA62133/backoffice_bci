import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { NotificationService } from '../../../services/notification/notification.service';
import {
  TransactionMultiple,
  TRANSACTIONS_MULTIPLES,
  OperationBancaire,
} from '../data/transaction-multile.data';

@Component({
  selector: 'app-detail-transaction-multiple',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './detail-transaction-multiple.component.html',
  styleUrl: './detail-transaction-multiple.component.css',
})
export class DetailTransactionMultipleComponent implements OnInit {
  transaction?: TransactionMultiple;
  isLoading: boolean = false;
  transactionId!: number;

  // Filtres opérations
  searchOperationText: string = '';
  filterCompte: string = '';
  filterDevise: string = '';
  filterMontantMin: number | null = null;
  filterMontantMax: number | null = null;

  // Pagination opérations
  operationPageSize = 10;
  currentOperationPage = 1;
  operationSortColumn = 'numero';
  operationSortDirection: 'asc' | 'desc' = 'asc';

  // Formulaires
  rejectForm!: FormGroup;

  private notification = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      const id = Number(params?.get('id'));
      if (!id || isNaN(id)) {
        this.goBackWithMessage('ID de transaction invalide');
        return;
      }
      this.transactionId = id;
      this.loadTransaction();
    });
  }

  initForm(): void {
    this.rejectForm = this.fb.group({
      motifRejet: ['', Validators.required],
    });
  }

  private loadTransaction(): void {
    this.isLoading = true;
    setTimeout(() => {
      const found = TRANSACTIONS_MULTIPLES.find(
        (t) => t.id === this.transactionId,
      );
      if (found) {
        this.transaction = found;
      } else {
        this.goBackWithMessage("Cette transaction n'existe pas");
      }
      this.isLoading = false;
    }, 300);
  }

  // ==========================================
  // LOGIQUE FILTRES ET PAGINATION OPÉRATIONS
  // ==========================================

  get filteredOperations(): OperationBancaire[] {
    if (!this.transaction) return [];

    let operations = [...this.transaction.operations];

    // Filtre recherche texte
    if (this.searchOperationText) {
      const searchLower = this.searchOperationText.toLowerCase();
      operations = operations.filter(
        (op) =>
          op.nomClient?.toLowerCase().includes(searchLower) ||
          op.motif?.toLowerCase().includes(searchLower) ||
          op.numeroCompte?.includes(searchLower),
      );
    }

    // Filtre numéro compte
    if (this.filterCompte) {
      operations = operations.filter((op) =>
        op.numeroCompte?.includes(this.filterCompte),
      );
    }

    // Filtre devise
    if (this.filterDevise) {
      operations = operations.filter((op) => op.devise === this.filterDevise);
    }

    // Filtre montant min
    if (this.filterMontantMin !== null && this.filterMontantMin > 0) {
      operations = operations.filter(
        (op) => op.montant >= this.filterMontantMin!,
      );
    }

    // Filtre montant max
    if (this.filterMontantMax !== null && this.filterMontantMax > 0) {
      operations = operations.filter(
        (op) => op.montant <= this.filterMontantMax!,
      );
    }

    // Tri
    operations.sort((a, b) => {
      let aVal = a[this.operationSortColumn as keyof OperationBancaire];
      let bVal = b[this.operationSortColumn as keyof OperationBancaire];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        if (aVal < bVal) return this.operationSortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.operationSortDirection === 'asc' ? 1 : -1;
        return 0;
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        const aStr = aVal.toLowerCase();
        const bStr = bVal.toLowerCase();
        if (aStr < bStr) return this.operationSortDirection === 'asc' ? -1 : 1;
        if (aStr > bStr) return this.operationSortDirection === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });

    return operations;
  }

  get totalMontantFiltered(): number {
    return this.filteredOperations.reduce((sum, op) => sum + op.montant, 0);
  }

  get paginatedOperations(): OperationBancaire[] {
    const start = (this.currentOperationPage - 1) * this.operationPageSize;
    return this.filteredOperations.slice(start, start + this.operationPageSize);
  }

  get operationTotalPages(): number {
    return Math.ceil(this.filteredOperations.length / this.operationPageSize);
  }

  get operationPaginationRange(): (number | string)[] {
    const range: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    if (this.operationTotalPages <= maxVisible) {
      for (let i = 1; i <= this.operationTotalPages; i++) range.push(i);
    } else {
      let startPage = Math.max(1, this.currentOperationPage - halfVisible);
      let endPage = Math.min(
        this.operationTotalPages,
        startPage + maxVisible - 1,
      );

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (startPage > 1) {
        range.push(1);
        if (startPage > 2) range.push('...');
      }

      for (let i = startPage; i <= endPage; i++) range.push(i);

      if (endPage < this.operationTotalPages) {
        if (endPage < this.operationTotalPages - 1) range.push('...');
        range.push(this.operationTotalPages);
      }
    }
    return range;
  }

  get operationStartIndex(): number {
    if (this.filteredOperations.length === 0) return 0;
    return (this.currentOperationPage - 1) * this.operationPageSize + 1;
  }

  get operationEndIndex(): number {
    return Math.min(
      this.currentOperationPage * this.operationPageSize,
      this.filteredOperations.length,
    );
  }

  onOperationPageClick(page: number | string): void {
    if (typeof page === 'number') this.currentOperationPage = page;
  }

  previousOperationPage(): void {
    if (this.currentOperationPage > 1) this.currentOperationPage--;
  }

  nextOperationPage(): void {
    if (this.currentOperationPage < this.operationTotalPages)
      this.currentOperationPage++;
  }

  sortOperations(col: string): void {
    if (this.operationSortColumn === col) {
      this.operationSortDirection =
        this.operationSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.operationSortColumn = col;
      this.operationSortDirection = 'asc';
    }
    this.currentOperationPage = 1;
  }

  getOperationSortIcon(column: string): string {
    if (this.operationSortColumn !== column) return 'fas fa-sort';
    return this.operationSortDirection === 'asc'
      ? 'fas fa-sort-up'
      : 'fas fa-sort-down';
  }

  resetOperationFilters(): void {
    this.searchOperationText = '';
    this.filterCompte = '';
    this.filterDevise = '';
    this.filterMontantMin = null;
    this.filterMontantMax = null;
    this.currentOperationPage = 1;
    this.operationSortColumn = 'numero';
    this.operationSortDirection = 'asc';
    this.notification.info('Filtres réinitialisés');
  }

  // ==========================================
  // EXPORT EXCEL
  // ==========================================

  exportToExcel(): void {
    if (!this.transaction) return;

    const exportData = this.filteredOperations.map((op) => ({
      'N°': op.numero,
      'Nom du client': op.nomClient,
      'N° Compte': op.numeroCompte,
      'Code Banque': op.codeBanque,
      'Code Guichet': op.codeGuichet,
      'Clé RIB': op.cleRib,
      Montant: op.montant,
      Devise: op.devise,
      Motif: op.motif,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Ajuster la largeur des colonnes
    const colWidths = [
      { wch: 5 }, // N°
      { wch: 25 }, // Nom du client
      { wch: 15 }, // N° Compte
      { wch: 12 }, // Code Banque
      { wch: 12 }, // Code Guichet
      { wch: 8 }, // Clé RIB
      { wch: 15 }, // Montant
      { wch: 8 }, // Devise
      { wch: 20 }, // Motif
    ];
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Operations_${this.transaction.reference}`,
    );

    XLSX.writeFile(workbook, `Transaction_${this.transaction.reference}.xlsx`);

    this.notification.success(
      `Export Excel effectué avec succès (${this.filteredOperations.length} opérations)`,
    );
  }

  // ==========================================
  // ACTIONS (VALIDER / REJETER)
  // ==========================================

  openValidateModal(): void {
    const modal = document.getElementById('validateModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
  }

  openRejectModal(): void {
    const modal = document.getElementById('rejectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
  }

  closeModals(): void {
    const validateModal = document.getElementById('validateModal');
    const rejectModal = document.getElementById('rejectModal');

    if (validateModal) {
      validateModal.classList.remove('show');
      validateModal.style.display = 'none';
      validateModal.style.backgroundColor = '';
    }
    if (rejectModal) {
      rejectModal.classList.remove('show');
      rejectModal.style.display = 'none';
      rejectModal.style.backgroundColor = '';
    }
    this.rejectForm.reset();
  }

  onValidate(): void {
    if (this.transaction) {
      this.transaction.statutDemande = 'Valide';
      this.notification.success('La transaction a été validée avec succès.');
      this.router.navigate(['/transactions-multiples']);
    }
  }

  onReject(): void {
    if (this.rejectForm.invalid) {
      this.rejectForm.markAllAsTouched();
      return;
    }

    if (this.transaction) {
      const motif = this.rejectForm.get('motifRejet')?.value;
      this.transaction.statutDemande = 'Rejete';
      this.transaction.motifRejet = motif;
      this.notification.success('La transaction a été rejetée avec succès.');
      this.closeModals();
      this.router.navigate(['/transactions-multiples']);
    }
  }

  // ==========================================
  // NAVIGATION
  // ==========================================

  goBack(): void {
    this.router.navigate(['/transactions-multiples']);
  }

  private goBackWithMessage(message: string) {
    this.notification.error(message);
    this.router.navigate(['/transactions-multiples']);
  }
}
