import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DemandeTransactionInternationale,
  toutesLesDemandes,
} from '../data/demandes.data';

import { NotificationService } from '../../../services/notification/notification.service';
import { ModalsService } from '../../../services/modals/modals.service';
import { DemandeTransactionClientService } from '../../../services/agent-trade/demande-transaction-client.service';

@Component({
  selector: 'app-detail-demande-client',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-demande-client.component.html',
  styleUrl: './detail-demande-client.component.css',
})
export class DetailDemandeClientComponent implements OnInit {
  demande?: DemandeTransactionInternationale;
  isLoading: boolean = false;

  bloqueForm!: FormGroup;
  valideForm!: FormGroup;
  demandeID!: number;

  private transactionService = inject(DemandeTransactionClientService);
  public notification = inject(NotificationService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalsService: ModalsService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initValidForm();

    this.route.paramMap.subscribe((params) => {
      const id = Number(params?.get('id'));

      if (!id || isNaN(id)) {
        this.goBackWithMessage('ID Invalide');
        return;
      }
      this.loadDemandeFromStaticData(id);
    });
  }

  initForm(): void {
    this.bloqueForm = this.fb.group({
      vcMotif: ['', Validators.required],
    });
  }

  initValidForm(): void {
    this.valideForm = this.fb.group({});
  }

  openModal(modalId: string) {
    if (!this.modalsService.isModalOpen(modalId)) {
      this.modalsService.openModal(modalId);
    }
  }

  closeModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);
    if (isModalOpen) {
      this.modalsService.closeModal(modalId);
      this.bloqueForm.reset();
      this.valideForm.reset();
    }
  }

  private loadDemandeFromStaticData(id: number): void {
    this.isLoading = true;

    setTimeout(() => {
      const found = toutesLesDemandes.find((d) => d.id === id);

      if (found) {
        this.demande = found;
        this.demandeID = id;
        console.log('Demande trouvée :', this.demande);
      } else {
        this.goBackWithMessage("Cette demande n'existe pas");
      }

      this.isLoading = false;
    }, 300);
  }

  onRejectAsk() {
    if (this.bloqueForm.invalid) {
      this.bloqueForm.markAllAsTouched();
      return;
    }

    const motif = this.bloqueForm.get('vcMotif')?.value;
    console.log('Rejet transaction:', {
      idDemande: this.demandeID,
      motif: motif,
    });

    this.transactionService.supprimerDemande(this.demandeID);

    this.notification.success('La transaction a été rejetée avec succès.');
    this.closeModal('unblockModal');
    this.router.navigate(['/demandes-clients']);
  }

  onValidateAsk() {
    console.log('Validation transaction:', {
      idDemande: this.demandeID,
    });

    this.transactionService.supprimerDemande(this.demandeID);

    this.notification.success('La transaction a été validée avec succès.');
    this.closeModal('valideModal');
    this.router.navigate(['/demandes-clients']);
  }

  private goBackWithMessage(message: string) {
    this.notification.error(message);
    this.router.navigate(['/demandes-clients']);
  }
}
