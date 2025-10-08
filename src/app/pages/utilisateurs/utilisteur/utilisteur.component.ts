import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-utilisteur',
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisteur.component.html',
  styleUrl: './utilisteur.component.css'
})
export class UtilisteurComponent {

  // Liste des utilisateurs
  utilisateurs = [
    { id: 1, nom: 'FELEMOU', prenom: 'Nyankoye Daniel', email: 'ndfelemou.dev@gmail.com', telephone: '620000000', role: 'Developer' },
    { id: 2, nom: 'Diallo', prenom: 'Mamadou', email: 'mamadou@mail.com', telephone: '620000002', role: 'Comptable' },
    { id: 3, nom: 'Bah', prenom: 'Aminata', email: 'aminata@mail.com', telephone: '620000003', role: 'Chef Comptable' },
    { id: 4, nom: 'Camara', prenom: 'Ibrahima', email: 'ibrahima@mail.com', telephone: '620000004', role: 'DAF' },
    { id: 5, nom: 'Sylla', prenom: 'Fatoumata', email: 'fatoumata@mail.com', telephone: '620000005', role: 'Comptable' },
    { id: 6, nom: 'Barry', prenom: 'Ousmane', email: 'ousmane@mail.com', telephone: '620000006', role: 'Chef Comptable' }
  ];

  @ViewChild('modalBody') modalBody!: ElementRef<HTMLDivElement>;
  private hasFocusedModalBody = false;

  showModalAjoutUtilisateur: boolean = false;

  newUser = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: ''
  };

  roles = ['Developer', 'Comptable', 'Chef Comptable', 'DAF'];

  // Pagination
  pageSizeOptions = [5, 10, 25, 50];
  pageSize: number = 5;
  currentPage: number = 1;

  // On expose Math pour l'utiliser dans le template
  Math = Math;

  get totalPages(): number {
    return Math.ceil(this.utilisateurs.length / this.pageSize);
  }

  get utilisateursPagines() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.utilisateurs.slice(startIndex, startIndex + this.pageSize);
  }

  changerPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      this.pageSize = newSize;
      this.currentPage = 1;
    }
  }

  // Modal & scroll logic
  ngAfterViewChecked() {
    if (this.showModalAjoutUtilisateur && this.modalBody && !this.hasFocusedModalBody) {
      this.modalBody.nativeElement.focus();
      this.hasFocusedModalBody = true;
    }
  }

  onModalBodyKeydown(event: KeyboardEvent) {
    const element = this.modalBody.nativeElement;
    const scrollStep = 40;

    switch (event.key) {
      case 'ArrowDown':
        element.scrollBy({ top: scrollStep, behavior: 'smooth' });
        event.preventDefault();
        break;
      case 'ArrowUp':
        element.scrollBy({ top: -scrollStep, behavior: 'smooth' });
        event.preventDefault();
        break;
      case 'PageDown':
        element.scrollBy({ top: element.clientHeight, behavior: 'smooth' });
        event.preventDefault();
        break;
      case 'PageUp':
        element.scrollBy({ top: -element.clientHeight, behavior: 'smooth' });
        event.preventDefault();
        break;
      case 'Home':
        element.scrollTo({ top: 0, behavior: 'smooth' });
        event.preventDefault();
        break;
      case 'End':
        element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
        event.preventDefault();
        break;
    }
  }

  openModalAjout() {
    this.showModalAjoutUtilisateur = true;
    this.hasFocusedModalBody = false;
    this.resetNewUser();
  }

  closeModalAjout() {
    this.showModalAjoutUtilisateur = false;
  }

  resetNewUser() {
    this.newUser = { nom: '', prenom: '', email: '', telephone: '', role: '' };
  }

  addUtilisateur(form: NgForm) {
    if (form.valid) {
      const newId = this.utilisateurs.length + 1;
      this.utilisateurs.push({ id: newId, ...this.newUser });
      this.closeModalAjout();

      // ajuster si on est à la dernière page
      if (this.currentPage < this.totalPages) {
        // rien
      } else {
        this.currentPage = this.totalPages;
      }
    }
  }
}
