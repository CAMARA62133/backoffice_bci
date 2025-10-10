import { Injectable } from '@angular/core';
declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  constructor() {}

  // Ouvrir une modal par son ID
  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error(`Modal avec l'ID ${modalId} non trouvée`);
    }
  }

  // Fermer un modal par son ID
  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  // Fermer toutes les modals
  closeAllModals(): void {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modalElement: any) => {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    });
  }

  // Vérifier si une modal est ouverte
  isModalOpen(modalId: string): boolean {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      return modalElement.classList.contains('show');
    }
    return false;
  }
}
