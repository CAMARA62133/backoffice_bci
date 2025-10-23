import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgIf, NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;

  @Output() pageChange = new EventEmitter<number>();

  /**
   * Nombre total de page
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Debut de l'index ou la position
   */
  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  /**
   * Fin de l'index ou la position
   */
  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
  }

  /**
   * A liste des numeros en fonction du nombre de donnees
   * @returns
   */
  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  /**
   * Aller a l page @page
   * @param page le numero de la page
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  /**
   * Premiere page
   */
  firstPage() {
    this.goToPage(1);
  }

  /**
   * Derniere page
   */
  lastPage() {
    this.goToPage(this.totalPages);
  }

  /**
   * Page precedente
   */
  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  /**
   * Page suivante
   */
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
}
