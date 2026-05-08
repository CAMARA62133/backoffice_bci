import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DemandeTransactionInternationale } from '../data/demandes.data';
import { DemandeTransactionClientService } from '../../../services/agent-trade/demande-transaction-client.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
})
export class TransactionDetailComponent implements OnInit {
  demande?: DemandeTransactionInternationale;
  isLoading = false;
  demandeId!: number;

  // Formulaires
  rejetForm!: FormGroup;
  validationForm!: FormGroup;

  // Role actuel (à définir selon l'utilisateur connecté)
  currentRole: 'AGENT_TRADE' | 'CONFORMITE' | 'DG_DGA' = 'AGENT_TRADE';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private transactionService = inject(DemandeTransactionClientService);
  private notification = inject(NotificationService);

  ngOnInit(): void {
    this.initForms();

    // On écoute à la fois les paramètres d'ID et les QueryParams pour le rôle
    this.route.params.subscribe((params) => {
      this.demandeId = +params['id'];
      this.loadDemande();
    });

    // RÉCUPÉRATION DU RÔLE ICI
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['role']) {
        this.currentRole = queryParams['role'];
      }
    });
  }
  private initForms(): void {
    this.rejetForm = this.fb.group({
      motif: ['', Validators.required],
    });

    this.validationForm = this.fb.group({});
  }

  private loadDemande(): void {
    this.isLoading = true;

    setTimeout(() => {
      const demandes = this.transactionService.getDemandes();
      this.demande = demandes.find((d) => d.id === this.demandeId);
      this.isLoading = false;
    }, 300);
  }

  // ==========================================
  // LOGIQUE WORKFLOW PAR ROLE
  // ==========================================

  /**
   * Vérifie si l'utilisateur actuel peut valider la demande
   */
  canValidate(): boolean {
    if (!this.demande) return false;
    if (this.demande.statutDemande !== 'EN_ATTENTE') return false;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        // Agent Trade peut valider à l'étape AGENT_TRADE (envoi initial)
        // OU à l'étape FINALISATION (validation finale)
        return (
          this.demande.etapeValidation === 'AGENT_TRADE' ||
          this.demande.etapeValidation === 'FINALISATION'
        );

      case 'CONFORMITE':
        // Conformité peut valider uniquement les demandes à l'étape CONFORMITE
        return this.demande.etapeValidation === 'CONFORMITE';

      case 'DG_DGA':
        // DG/DGA peut valider uniquement les demandes à l'étape DG_DGA
        return this.demande.etapeValidation === 'DG_DGA';

      default:
        return false;
    }
  }

  /**
   * Vérifie si l'utilisateur actuel peut rejeter la demande
   */
  canReject(): boolean {
    if (!this.demande) return false;
    if (this.demande.statutDemande !== 'EN_ATTENTE') return false;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        // Agent Trade peut rejeter uniquement au début (AGENT_TRADE)
        return this.demande.etapeValidation === 'AGENT_TRADE';

      case 'CONFORMITE':
        // Conformité peut rejeter à l'étape CONFORMITE
        return this.demande.etapeValidation === 'CONFORMITE';

      case 'DG_DGA':
        // DG/DGA peut rejeter à l'étape DG_DGA
        return this.demande.etapeValidation === 'DG_DGA';

      default:
        return false;
    }
  }

  /**
   * Vérifie si c'est une validation finale (Agent Trade à l'étape FINALISATION)
   */
  isFinalValidation(): boolean {
    return (
      this.currentRole === 'AGENT_TRADE' &&
      this.demande?.etapeValidation === 'FINALISATION'
    );
  }

  /**
   * Affiche le libellé du prochain rôle
   */
  getNextRoleLabel(): string {
    if (!this.demande) return '';

    if (!this.demande.derogation) {
      // Sans procuration: Agent Trade → Conformité → Finalisation (Agent Trade)
      switch (this.demande.etapeValidation) {
        case 'AGENT_TRADE':
          return 'Conformité';
        case 'CONFORMITE':
          return "l'Agent Trade pour validation finale";
        default:
          return '';
      }
    } else {
      // Avec procuration: Agent Trade → Conformité → DG/DGA → Finalisation (Agent Trade)
      switch (this.demande.etapeValidation) {
        case 'AGENT_TRADE':
          return 'Conformité';
        case 'CONFORMITE':
          return 'DG/DGA';
        case 'DG_DGA':
          return "l'Agent Trade pour validation finale";
        default:
          return '';
      }
    }
  }

  /**
   * Libellé du bouton de validation
   */
  /**
   * Libellé et icône du bouton de validation
   * Gère les deux cas : Normal (vers Finalisation) et Dérogation (vers DG/DGA)
   */
  getValidationButton(): { label: string; icon: string } {
    // CAS 1 : Validation finale (Uniquement Agent Trade à l'étape FINALISATION)
    if (this.isFinalValidation()) {
      return { label: 'Validation finale', icon: 'fa-check-double' };
    }

    if (!this.demande) return { label: 'Valider', icon: 'fa-check' };

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        // CAS 2 : Premier envoi (Agent Trade -> Conformité)
        return { label: 'Vérifier et transmettre', icon: 'fa-arrow-right' };

      case 'CONFORMITE':
        // La conformité transmet soit vers le DG, soit vers l'Agent Trade pour clôture
        return this.demande.derogation
          ? { label: 'Vérifier et transmettre (DG)', icon: 'fa-share-square' }
          : { label: 'Vérifier et transmettre', icon: 'fa-share-square' };

      case 'DG_DGA':
        // Le DG approuve et renvoie vers l'Agent Trade pour la validation finale
        return { label: 'Approuver et transmettre', icon: 'fa-user-check' };

      default:
        return { label: 'Valider', icon: 'fa-check' };
    }
  }
  /**
   * Valider la demande selon le rôle et l'étape
   */
  onValidate(): void {
    if (!this.demande) return;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        if (this.demande.etapeValidation === 'AGENT_TRADE') {
          // Envoi initial à la conformité
          const success = this.transactionService.envoyerConformite(
            this.demande.id,
          );
          if (success) {
            this.notification.success(
              '✓ Demande envoyée à la conformité avec succès',
            );
            this.loadDemande();
            this.closeValidateModal();
          } else {
            this.notification.error("Erreur lors de l'envoi à la conformité");
          }
        }
        break;

      case 'CONFORMITE':
        if (this.demande.etapeValidation === 'CONFORMITE') {
          const success = this.transactionService.validerConformite(
            this.demande.id,
          );
          if (success) {
            const message = this.demande.derogation
              ? '✓ Demande validée par la conformité - Envoyée à la DG/DGA'
              : '✓ Demande validée par la conformité - Envoyée pour validation finale';
            this.notification.success(message);
            this.loadDemande();
            this.closeValidateModal();
          } else {
            this.notification.error('Erreur lors de la validation');
          }
        }
        break;

      case 'DG_DGA':
        if (this.demande.etapeValidation === 'DG_DGA') {
          const success = this.transactionService.validerDG(this.demande.id);
          if (success) {
            this.notification.success(
              '✓ Dérogation approuvée par la DG/DGA - Envoyée pour validation finale',
            );
            this.loadDemande();
            this.closeValidateModal();
          } else {
            this.notification.error("Erreur lors de l'approbation");
          }
        }
        break;
    }
  }

  /**
   * Validation finale par Agent Trade (étape FINALISATION)
   */
  onFinalValidation(): void {
    if (!this.demande) return;

    if (
      this.demande.etapeValidation === 'FINALISATION' &&
      this.currentRole === 'AGENT_TRADE'
    ) {
      const success = this.transactionService.validerFinalement(
        this.demande.id,
      );
      if (success) {
        this.notification.success('Transaction validée avec succès !');
        this.closeValidateModal();
        // Rediriger vers la liste appropriée
        if (this.demande.derogation) {
          this.router.navigate(['/transaction-par-procuration']);
        } else {
          this.router.navigate(['/transaction-sans-procuration']);
        }
      } else {
        this.notification.error('Erreur lors de la validation finale');
      }
    }
  }

  /**
   * Rejeter la demande
   */
  onReject(): void {
    if (this.rejetForm.invalid) {
      this.rejetForm.markAllAsTouched();
      this.notification.error('Veuillez saisir un motif de rejet');
      return;
    }

    if (!this.demande) return;

    const motif = this.rejetForm.get('motif')?.value;
    let success = false;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        if (this.demande.etapeValidation === 'AGENT_TRADE') {
          success = this.transactionService.rejeterFinalement(
            this.demande.id,
            motif,
          );
        }
        break;

      case 'CONFORMITE':
        if (this.demande.etapeValidation === 'CONFORMITE') {
          success = this.transactionService.rejeterConformite(
            this.demande.id,
            motif,
          );
        }
        break;

      case 'DG_DGA':
        if (this.demande.etapeValidation === 'DG_DGA') {
          success = this.transactionService.rejeterDG(this.demande.id, motif);
        }
        break;
    }

    if (success) {
      this.notification.error('❌ Demande rejetée', motif);
      this.closeRejectModal();
      // Rediriger vers la liste appropriée
      if (this.demande.derogation) {
        this.router.navigate(['/transaction-par-procuration']);
      } else {
        this.router.navigate(['/transaction-sans-procuration']);
      }
    } else {
      this.notification.error('Erreur lors du rejet');
    }
  }

  // ==========================================
  // MODALS
  // ==========================================

  openValidateModal(): void {
    const modal = document.getElementById('validateModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  openRejectModal(): void {
    this.rejetForm.reset();
    const modal = document.getElementById('rejectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  closeRejectModal(): void {
    const modal = document.getElementById('rejectModal');
    const backdrop = document.querySelector('.modal-backdrop');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    if (backdrop) {
      backdrop.remove();
    }
    this.rejetForm.reset();
  }

  closeValidateModal(): void {
    const modal = document.getElementById('validateModal');
    const backdrop = document.querySelector('.modal-backdrop');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    if (backdrop) {
      backdrop.remove();
    }
  }

  // ==========================================
  // UTILS
  // ==========================================

  goBack(): void {
    const targetRoute = this.demande?.derogation
      ? '/transaction-par-procuration'
      : '/transaction-sans-procuration';

    this.router.navigate([targetRoute], {
      queryParams: { role: this.currentRole },
    });
  }

  getEtapeLabel(etape: string): string {
    const labels: Record<string, string> = {
      AGENT_TRADE: '📝 Agent Trade',
      CONFORMITE: '🛡️ Conformité',
      DG_DGA: '👔 DG / DGA',
      FINALISATION: '🏁 Finalisation',
    };
    return labels[etape] || etape;
  }

  getEtapeClass(etape: string): string {
    const classes: Record<string, string> = {
      AGENT_TRADE: 'bg-secondary',
      CONFORMITE: 'bg-info',
      DG_DGA: 'bg-warning',
      FINALISATION: 'bg-primary',
    };
    return classes[etape] || 'bg-secondary';
  }

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      EN_ATTENTE: '⏳ En attente',
      VALIDE: '✅ Validé',
      REJETE: '❌ Rejeté',
    };
    return labels[statut] || statut;
  }

  getStatutClass(statut: string): string {
    const classes: Record<string, string> = {
      EN_ATTENTE: 'bg-warning',
      VALIDE: 'bg-success',
      REJETE: 'bg-danger',
    };
    return classes[statut] || 'bg-secondary';
  }

  /**
   * Vérifier si l'étape est complétée (pour l'affichage de la timeline)
   */
  isEtapeCompleted(etape: string): boolean {
    if (!this.demande) return false;

    const etapes = ['AGENT_TRADE', 'CONFORMITE', 'DG_DGA', 'FINALISATION'];
    const currentIndex = etapes.indexOf(this.demande.etapeValidation);
    const etapeIndex = etapes.indexOf(etape);

    // Pour DG/DGA, n'est nécessaire que si dérogation
    if (etape === 'DG_DGA' && !this.demande.derogation) {
      return true; // Skip cette étape
    }

    return etapeIndex < currentIndex;
  }

  /**
   * Ouvre un PDF stocké dans le dossier public/pdfs
   * @param filePath Chemin relatif du fichier (ex: '/pdfs/ddi.pdf')
   */
  viewFile(filePath: string | null | undefined): void {
    if (filePath) {
      // window.open ouvre l'URL directe du fichier dans un nouvel onglet
      // Le navigateur utilisera son lecteur PDF natif
      window.open(filePath, '_blank');
    } else {
      console.warn('Fichier non disponible');
    }
  }
}
