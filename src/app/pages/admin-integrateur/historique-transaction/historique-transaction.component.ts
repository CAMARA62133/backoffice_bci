

import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ToastrService } from 'ngx-toastr';
import { HistoriqueTransactionService } from '../../../services/admin-integrateur/historique-transaction.service';
import { Transaction } from '../models/transaction.interface';

@Component({
  selector: 'app-historique-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './historique-transaction.component.html',
  styleUrl: './historique-transaction.component.css',
})
export class HistoriqueTransactionComponent implements OnInit {
  private historiqueService = inject(HistoriqueTransactionService);
  private toastr = inject(ToastrService);
  iOrganisationID!: number;
  infosUser: any;

  dateDebut: string = '';
  dateFin: string = '';
  paymentModeName: string = '';

  historiqueTransactions: Transaction[] = [];
  isLoading = false;
  listePaymentModes: string[] = [];

  pageSize = 5;
  currentPage = 1;
  searchText = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loadHistorique();
  }

  //   // --- Chargement des données ---
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
  // ========================
  // FILTRAGE + TRI
  // ========================
  get filteredData() {
    let data = [...this.historiqueTransactions];

    // Filtre date début
    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      data = data.filter((d) => new Date(d.dtCreated) >= debut);
    }

    // Filtre date fin
    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      fin.setHours(23, 59, 59, 999);
      data = data.filter((d) => new Date(d.dtCreated) <= fin);
    }

    // Filtre mode paiement
    if (this.paymentModeName) {
      data = data.filter((d) => d.PaymentModeName === this.paymentModeName);
    }

    // Recherche texte
    if (this.searchText) {
      const term = this.searchText.toLowerCase();
      data = data.filter((d) =>
        Object.values(d).some((val) =>
          val?.toString().toLowerCase().includes(term),
        ),
      );
    }

    // Tri
    if (this.sortColumn) {
      data.sort((a, b) => {
        const valA = (a as any)[this.sortColumn] ?? '';
        const valB = (b as any)[this.sortColumn] ?? '';

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }
  resetFilters(): void {
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.paymentModeName = '';
    this.currentPage = 1;
    this.sortColumn = '';
    this.sortDirection = 'asc';

    // On recharge les données depuis le service pour être sûr d'avoir l'état initial
    this.loadHistorique();

    this.toastr.info('Filtres réinitialisés', '', {
      positionClass: 'toast-custom-center',
      timeOut: 2000,
    });
  }
  get paginedTransaction() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  startIndex() {
    return this.filteredData.length === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  endIndex() {
    return Math.min(this.currentPage * this.pageSize, this.filteredData.length);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  getPages(): (number | string)[] {
    const total = this.totalPages();
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', total);
      } else if (this.currentPage >= total - 2) {
        pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          total,
        );
      }
    }
    return pages;
  }

  onPageClick(page: number | string) {
    if (typeof page === 'number') {
      this.goToPage(page);
    }
  }

  sort(col: string) {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
  }
  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      // Icône inactive : grise et un peu transparente
      return 'fa-sort text-muted opacity-50';
    }
    // Icône active : Blanche pour contraster avec le fond
    return this.sortDirection === 'asc'
      ? 'fa-sort-up text-white'
      : 'fa-sort-down text-white';
  }

  formatMontant(t: any): string {
    const montant = Number(t);

    return montant.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // ========================
  // EXPORT EXCEL
  // ========================
  exportExcel() {
    if (this.filteredData.length === 0) return;

    const dataForExcel = this.filteredData.map((d) => ({
      Date: new Date(d.dtCreated).toLocaleString(),
      Reference: d.Reference,
      Nom: d.UserFullName,
      Mode: d.PaymentModeName,
      Montant: d.Amount,
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  }

  // ========================
  // EXPORT PDF
  // ========================
  exportPdf() {
    if (this.filteredData.length === 0) return;

    const doc = new jsPDF('l', 'mm', 'a4');
    doc.text('Liste des transactions', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Date', 'Reference', 'Nom', 'Mode', 'Montant']],
      body: this.filteredData.map((d) => [
        new Date(d.dtCreated).toLocaleString(),
        d.Reference,
        d.UserFullName,
        d.PaymentModeName,
        d.Amount,
      ]),
      styles: { fontSize: 9 },
    });

    doc.save('transactions.pdf');
  }

  selectedTransaction: any = null;
  isCancelling: boolean = false;

  openCancelModal(transaction: any) {
    this.selectedTransaction = transaction;
  }

  decodeMessage(encoded: string): string {
    if (!encoded) return encoded;

    return (
      encoded
        // replacement des séquences courantes
        .replace(/\+á/g, 'à')
        .replace(/\+é/g, 'é')
        .replace(/\+è/g, 'è')
        .replace(/\+®/g, 'é')
        .replace(/\+ç/g, 'ç')
        .replace(/\+ô/g, 'ô')
        .replace(/\+°/g, 'ô')
        .replace(/\+ù/g, 'ù')
        .replace(/\+/g, ' ') // transformer les + restants en espaces
        .trim()
    );
  }
  getStatusLabel(status: string): string {
    if (!status) return 'Inconnu';

    switch (status.toLowerCase()) {
      case 'success':
        return 'Succès';
      case 'cancelled':
        return 'Annulé'; 
      case 'failed':
        return 'Échoué';
      case 'pending':
        return 'En attente';
      default:
        return status; 
    }
  }
  confirmCancel() {
    if (!this.selectedTransaction) return;

    this.isCancelling = true;

    // Log pour débogage
    console.log(
      "Tentative d'annulation de l'ID :",
      this.selectedTransaction.iRequestID,
    );

    this.historiqueService
      .cancelTransaction(this.selectedTransaction.iRequestID)
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.toastr.success(
              // this.decodeMessage(response.message) ||
              'Transaction annulée avec succès',
              'Succès',
              { positionClass: 'toast-custom-center' },
            );

            this.loadHistorique();
          } else {
            const errorMsg =
              this.decodeMessage(response.message) ||
              "Impossible d'annuler la transaction";
            this.toastr.error(errorMsg, 'Erreur', {
              positionClass: 'toast-custom-center',
            });
          }

          // Nettoyage après réception de la réponse
          this.closeModal(); // Ferme le modal proprement
          this.isCancelling = false;
        },
        error: (err) => {
          // En cas de crash réseau ou erreur 500
          this.toastr.error('Une erreur technique est survenue.', 'Erreur', {
            positionClass: 'toast-custom-center',
          });
          this.isCancelling = false;
        },
      });
  }
  closeModal() {
    this.selectedTransaction = null;
  }

  checkStatus(requestID: string) {
    if (!requestID) return;

    this.isLoading = true;
    this.historiqueService.getTransactionStatus(requestID).subscribe({
      next: (res: any) => {
        // Supposons que la réponse contient la transaction mise à jour
        const index = this.historiqueTransactions.findIndex(
          (t) => t.iRequestID === requestID,
        );
        if (index !== -1) {
          this.historiqueTransactions[index].Status = res.Status;
        }
        this.toastr.success('Statut mis à jour', '', {
          positionClass: 'toast-custom-center',
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de la vérification du statut', '', {
          positionClass: 'toast-custom-center',
        });
        this.isLoading = false;
      },
    });
  }
}
