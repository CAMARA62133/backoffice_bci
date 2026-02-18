import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // ==========================================
  // 1. LOGIQUE DE TABLE (Tri, Filtre, Recherche)
  // ==========================================

  /** Recherche textuelle globale sur toutes les propriétés d'un objet */
  search(data: any[], term: string): any[] {
    if (!term) return data;
    const t = term.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((v) => v?.toString().toLowerCase().includes(t)),
    );
  }

  /** Filtrage par plage de dates */
  filterByDateRange(
    data: any[],
    field: string,
    start: string,
    end: string,
  ): any[] {
    if (!start && !end) return data;
    return data.filter((item) => {
      const date = new Date(item[field]);
      const isAfter = start ? date >= new Date(start) : true;
      const isBefore = end
        ? date <= new Date(new Date(end).setHours(23, 59, 59, 999))
        : true;
      return isAfter && isBefore;
    });
  }

  /** Filtrage par valeur exacte (ex: Mode de paiement, Status) */
  filterByValue(data: any[], field: string, value: any): any[] {
    if (!value || value === '') return data;
    return data.filter((item) => item[field] === value);
  }

  /** Tri générique (ascendant ou descendant) */
  sort(data: any[], column: string, direction: 'asc' | 'desc'): any[] {
    if (!column) return data;
    return [...data].sort((a, b) => {
      const aVal = a[column] ?? '';
      const bVal = b[column] ?? '';
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /** Retourne la classe CSS de l'icône FontAwesome selon l'état du tri */
  getSortIcon(column: string, activeCol: string, dir: string): string {
    if (activeCol !== column) return 'fa-sort text-muted opacity-50';
    return dir === 'asc' ? 'fa-sort-up text-white' : 'fa-sort-down text-white';
  }

  // ==========================================
  // 2. PAGINATION
  // ==========================================

  /** Découpe le tableau pour la page actuelle */
  paginate(data: any[], page: number, pageSize: number): any[] {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }

  /** Calcule les numéros de pages à afficher (avec les '...') */
  getPaginationRange(current: number, total: number): (number | string)[] {
    const pages: (number | string)[] = [];
    const delta = 2;
    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  }

  // ==========================================
  // 3. FORMATAGE ET NETTOYAGE (FormatUtils)
  // ==========================================

  /** Décode les messages API contenant des séquences comme '+é' ou '+°' */
  decodeMessage(encoded: string): string {
    if (!encoded) return encoded;
    return encoded
      .replace(/\+á/g, 'à')
      .replace(/\+é/g, 'é')
      .replace(/\+è/g, 'è')
      .replace(/\+®/g, 'é')
      .replace(/\+ç/g, 'ç')
      .replace(/\+ô/g, 'ô')
      .replace(/\+°/g, 'ô')
      .replace(/\+ù/g, 'ù')
      .replace(/\+/g, ' ')
      .trim();
  }

  /** Formate un nombre en format monétaire français (ex: 1250.5 -> 1 250,50) */
  formatAmount(value: any): string {
    const amount = Number(value);
    if (isNaN(amount)) return '0,00';
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  /** Traduit les statuts techniques de l'API en français lisible */
  getStatusLabel(status: string): string {
    if (!status) return 'Inconnu';
    const statusMap: { [key: string]: string } = {
      success: 'Succès',
      cancelled: 'Annulé',
      failed: 'Échoué',
      pending: 'En attente',
    };
    return statusMap[status.toLowerCase()] || status;
  }

  // --- Dans UtilsService ---

  // 1. LOGIQUE DE TABLE (Tri)
  /** Gère la mutation de l'état du tri (asc/desc) pour une colonne */
  handleSort(column: string, currentCol: string, currentDir: 'asc' | 'desc') {
    if (currentCol === column) {
      return currentDir === 'asc' ? 'desc' : 'asc';
    }
    return 'asc';
  }

  // 2. PAGINATION (Actions & Navigation)
  /** Calcule l'index de début (ex: 1) */
  getStartIndex(page: number, pageSize: number, total: number): number {
    return total === 0 ? 0 : (page - 1) * pageSize + 1;
  }

  /** Calcule l'index de fin (ex: 10) */
  getEndIndex(page: number, pageSize: number, total: number): number {
    return Math.min(page * pageSize, total);
  }

  /** Calcule le nombre total de pages */
  getTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  /** Retourne le numéro de la page précédente */
  getPreviousPage(current: number): number {
    return current > 1 ? current - 1 : current;
  }

  /** Retourne le numéro de la page suivante */
  getNextPage(current: number, totalPages: number): number {
    return current < totalPages ? current + 1 : current;
  }
}
