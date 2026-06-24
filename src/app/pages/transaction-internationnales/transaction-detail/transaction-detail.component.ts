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

import { TransactionInternationale } from '../data/transaction-internationnale.data';
import { DemandeTransactionClientService } from '../../../services/agent-trade/demande-transaction-client.service';
import { SkeletonLoaderComponent } from '../../../shared/skeleton/skeleton-loader.component';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonLoaderComponent,
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
})
export class TransactionDetailComponent implements OnInit {
  demande?: TransactionInternationale;
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

    this.route.params.subscribe((params) => {
      this.demandeId = +params['id'];
      this.loadDemande();
    });

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

  canValidate(): boolean {
    if (!this.demande) return false;
    if (this.demande.statutDemande !== 'EN_ATTENTE') return false;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        return (
          this.demande.etapeValidation === 'AGENT_TRADE' ||
          this.demande.etapeValidation === 'FINALISATION'
        );
      case 'CONFORMITE':
        return this.demande.etapeValidation === 'CONFORMITE';
      case 'DG_DGA':
        return this.demande.etapeValidation === 'DG_DGA';
      default:
        return false;
    }
  }

  canReject(): boolean {
    if (!this.demande) return false;
    if (this.demande.statutDemande !== 'EN_ATTENTE') return false;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        return this.demande.etapeValidation === 'AGENT_TRADE';
      case 'CONFORMITE':
        return this.demande.etapeValidation === 'CONFORMITE';
      case 'DG_DGA':
        return this.demande.etapeValidation === 'DG_DGA';
      default:
        return false;
    }
  }

  isFinalValidation(): boolean {
    return (
      this.currentRole === 'AGENT_TRADE' &&
      this.demande?.etapeValidation === 'FINALISATION'
    );
  }

  getNextRoleLabel(): string {
    if (!this.demande) return '';

    if (!this.demande.derogation) {
      switch (this.demande.etapeValidation) {
        case 'AGENT_TRADE':
          return 'Conformité';
        case 'CONFORMITE':
          return "l'Agent Trade pour validation finale";
        default:
          return '';
      }
    } else {
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

  getValidationButton(): { label: string; icon: string } {
    if (this.isFinalValidation()) {
      return { label: 'Validation finale', icon: 'fa-check-double' };
    }

    if (!this.demande) return { label: 'Valider', icon: 'fa-check' };

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        return { label: 'Vérifier et transmettre', icon: 'fa-arrow-right' };
      case 'CONFORMITE':
        return this.demande.derogation
          ? { label: 'Vérifier et transmettre (DG)', icon: 'fa-share-square' }
          : { label: 'Vérifier et transmettre', icon: 'fa-share-square' };
      case 'DG_DGA':
        return { label: 'Approuver et transmettre', icon: 'fa-user-check' };
      default:
        return { label: 'Valider', icon: 'fa-check' };
    }
  }

  onValidate(): void {
    if (!this.demande) return;

    switch (this.currentRole) {
      case 'AGENT_TRADE':
        if (this.demande.etapeValidation === 'AGENT_TRADE') {
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
      if (this.demande.derogation) {
        this.router.navigate(['/transaction-par-procuration']);
      } else {
        this.router.navigate(['/transaction-sans-procuration']);
      }
    } else {
      this.notification.error('Erreur lors du rejet');
    }
  }

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

  isEtapeCompleted(etape: string): boolean {
    if (!this.demande) return false;

    const etapes = ['AGENT_TRADE', 'CONFORMITE', 'DG_DGA', 'FINALISATION'];
    const currentIndex = etapes.indexOf(this.demande.etapeValidation);
    const etapeIndex = etapes.indexOf(etape);

    if (etape === 'DG_DGA' && !this.demande.derogation) {
      return true;
    }

    return etapeIndex < currentIndex;
  }

  viewFile(filePath: string | null | undefined): void {
    if (filePath) {
      window.open(filePath, '_blank');
    } else {
      console.warn('Fichier non disponible');
    }
  }
}
