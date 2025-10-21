import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationsService {
  private data: any[] = []; // ✅ garde la liste des données
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor() {}
  /** Définir les données et le nombre par page */
  setData(data: any[], itemsPerPage: number = 10): void {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = data.length;
    this.currentPage = 1;
  }

  /** Nombre total de pages */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /** Indices de pagination */
  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    const end = this.startIndex + this.itemsPerPage;
    return end > this.totalItems ? this.totalItems : end;
  }

  /** Retourne les données paginées */
  getPaginatedData(): any[] {
    return this.data.slice(this.startIndex, this.endIndex);
  }

  /** Navigation */
  goToFirstPage(): void {
    this.currentPage = 1;
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  reset(): void {
    this.currentPage = 1;
  }
}
