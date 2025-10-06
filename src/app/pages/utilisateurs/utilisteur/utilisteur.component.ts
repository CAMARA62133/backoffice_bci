import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-utilisteur',
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisteur.component.html',
  styleUrl: './utilisteur.component.css'
})
export class UtilisteurComponent {

  utilisateurs = [
    { nom: 'FELEMOU', prenom: 'Nyankoye Daniel', email: 'ndfelemou.dev@gmail.com', role: 'Developer' },
    { nom: 'Diallo', prenom: 'Mamadou', email: 'mamadou@mail.com', role: 'Comptable' },
    { nom: 'Bah', prenom: 'Aminata', email: 'aminata@mail.com', role: 'Chef Comptable' },
    { nom: 'Camara', prenom: 'Ibrahima', email: 'ibrahima@mail.com', role: 'DAF' },
    { nom: 'Sylla', prenom: 'Fatoumata', email: 'fatoumata@mail.com', role: 'Comptable' },
    { nom: 'Barry', prenom: 'Ousmane', email: 'ousmane@mail.com', role: 'Chef Comptable' }
  ];


  utilisateursFiltrees = [...this.utilisateurs];

  showModal = false;

  filterEmail = '';
  filterName = '';
  filterRole = '';

  nouveauUser = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    role: ''
  };

  ouvrirModal() {
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
  }

  ajouterUtilisateur() {
    if (this.nouveauUser.nom && this.nouveauUser.prenom && this.nouveauUser.email && this.nouveauUser.telephone && this.nouveauUser.password && this.nouveauUser.role) {
      this.utilisateurs.push({ ...this.nouveauUser });
      this.utilisateursFiltrees = [...this.utilisateurs];
      this.nouveauUser = { nom: '', prenom: '', email: '', telephone: '', password: '', role: '' };
      this.fermerModal();
    }
  }

  filtrer() {
    this.utilisateursFiltrees = this.utilisateurs.filter(user =>
      (this.filterEmail ? user.email.toLowerCase().includes(this.filterEmail.toLowerCase()) : true) &&
      (this.filterRole ? user.role === this.filterRole : true)
    );
  }
}
