import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidDemandePayload } from '../../../core/interfaces/demande.interface';
import { RejectionReason } from '../../../core/interfaces/reject-raison.interface';
import { AuthService } from '../../../core/node/services/auth/auth.service';
import { RejectRaisonService } from '../../../core/node/services/reject-raison/reject-raison.service';
import { DemandeService } from '../../../services/agent-conformite/demande/demande.service';
import { AuthService as LaraAuthService } from '../../../services/auth/authService/auth.service';
import { ModalsService } from '../../../services/modals/modals.service';

// Déclarer bootstrap pour TypeScript
declare var bootstrap: any;

@Component({
  selector: 'app-agent-fiche-demandes',
  imports: [NgIf, NgForOf, CurrencyPipe, NgClass, ReactiveFormsModule],
  templateUrl: './agent-fiche-demandes.component.html',
  styleUrl: './agent-fiche-demandes.component.css',
})
export class AgentFicheDemandesComponent implements OnInit {
  // id!: string;
  demande!: any;
  isLoading: boolean = false;

  bloqueForm!: FormGroup;
  valideForm!: FormGroup;

  isLoadingReasons!: boolean;
  reasons!: RejectionReason[];

  currentUser: any;
  demandeID!: number;

  private clientSitelink: string = 'http://localhost:4201';

  constructor(
    private route: ActivatedRoute,
    private demandeService: DemandeService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private modalsService: ModalsService,
    private nodeAuthServie: AuthService,
    private rejectRaisonService: RejectRaisonService,
    private laravAuthService: LaraAuthService,
  ) {}

  ngOnInit() {
    const user = this.laravAuthService.getCurrentUser();
    if (user) {
      this.currentUser = user;
      console.log('current user', this.currentUser);
    }

    // Recuperation de l'id dans l'url a chaque changement
    this.route.paramMap.subscribe((params) => {
      const id = Number(params?.get('id'));

      if (id) {
        this.demandeID = id;
        console.log("recuperation de l'id dans les params : ", id);
      }

      this.loadDemande(id);
    });

    this.initForm();
    this.initValidForm();

    this.loadRejectRaisons();
    // this.loadDemande();
  }

  initForm(): void {
    this.bloqueForm = this.fb.group(
      {
        rejectReason: [''],
        vcNotes: [''],
      },
      {
        validators: [this.atLeastOneRequiredValidator()],
      },
    );
  }

  initValidForm(): void {
    this.valideForm = this.fb.group({
      vcNotes: ['', Validators.required],
    });
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
    }
  }

  // Au rejet de la memande
  onRejectAsk() {
    if (this.bloqueForm.invalid) {
      this.bloqueForm.markAllAsTouched();
      console.log(
        "Formulaire invalide voici l'erreur : ",
        this.bloqueForm.value,
      );
      return;
    }

    console.log('params form : ', this.bloqueForm.value);
    const newVcNotes = this.bloqueForm.get('rejectReason')?.value
      ? this.bloqueForm.get('rejectReason')?.value
      : this.bloqueForm.get('vcNotes')?.value;

    const payload = {
      idDemande: this.demandeID,
      vcNotes: newVcNotes,
      iValidatorID: this.currentUser.id,
    };

    console.log({ payload });
    this.rejectRaisonService.rejectedDemande(payload).subscribe({
      next: (res) => {
        if (res?.status === 200) {
          this.toastr.success('La demande a été rejetée avec succès.', '', {
            positionClass: 'toast-custom-center',
          });
          this.closeModal('rejectModal');
          this.router.navigate(['/agent-demandes']);
          this.closeModal('unblockModal');
        } else {
          this.toastr.error(
            'Une erreur est survenue lors du rejet de la demande.',
            '',
            { positionClass: 'toast-custom-center' },
          );
          console.log('Erreur rejet demande:', res);
        }
        console.log('res rejet demande:', res);
      },

      error: (err) => {
        this.toastr.error('Une erreur interne est survenue.', '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err rejet demande:', err);
      },
    });
  }

  onValidateAsk() {
    if (this.valideForm.invalid) {
      this.valideForm.markAllAsTouched();
      console.log("Formulaire invalide voici l'erreur: ");
      return;
    }

    console.log('Formulaire soumis', this.valideForm.value);
    const payload: ValidDemandePayload = {
      idDemande: Number(this.demandeID),
      vcNotes: this.valideForm.get('vcNotes')?.value,
      iValidatorID: Number(this.currentUser.id),
      lienSiteClient: this.clientSitelink,
    };

    console.log({ payload });

    this.demandeService.validDemandeSouscription(payload).subscribe({
      next: (res) => {
        if (res?.status === 200) {
          this.toastr.success(res.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.closeModal('valideModal');
          this.router.navigate(['/agent-demandes']);
        } else {
          this.toastr.error(
            'Une erreur est survenue lors de la validation de la demande.',
            '',
            { positionClass: 'toast-custom-center' },
          );
          console.log('Erreur validation demande:', res);
        }
        console.log('res validation demande:', res);
      },

      error: (err) => {
        this.toastr.error('Une erreur interne est survenue.', '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err rejet demande:', err);
      },

      // next: (res) => {
      //   if (res?.status === 200) {
      //     this.toastr.success('La demande a été validée avec succès.', '', {
      //       positionClass: 'toast-custom-center',
      //     });
      //     this.closeModal('valideModal');
      //     this.router.navigate(['/agent-demandes']);
      //   } else {
      //     this.toastr.error('Une erreur est survenue lors de la validation de la demande.',
      //       '', {positionClass: 'toast-custom-center'}
      //     );
      //     console.log('Erreur validation demande:', res);
      //   }
      //   console.log('res validation demande:', res);
      // },
      //
      // error: (err) => {
      //   this.toastr.error('Une erreur interne est survenue.', '', {
      //     positionClass: 'toast-custom-center',
      //   });
      //   console.log('err rejet demande:', err);
      // },
    });
  }

  private atLeastOneRequiredValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const rejectReason = formGroup.get('rejectReason')?.value;
      const vcNotes = formGroup.get('vcNotes')?.value;

      if (!rejectReason && !vcNotes) {
        return { atLeastOneRequired: true };
      }

      return null;
    };
  }

  // Private function to load the subscription liste
  private loadDemande(id: number) {
    this.isLoading = true;
    this.demandeService.oneDemandeSouscription(id).subscribe({
      next: (res) => {
        if (res?.status === 200) {
          this.demande = res?.data[0];
          console.log('ID:', id);
          console.log('Detail: ', this.demande);
        } else {
          if (res?.error?.message === 'Unauthenticated.') {
            this.toastr.error('Votre session a expirée', '', {
              positionClass: 'toast-custom-center',
            });
            this.router.navigate(['/login']);
          }
        }
        this.isLoading = false;
        console.log('res', res);
      },

      error: (err) => {
        this.toastr.error('Une erreur interne est survenue.', '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err demandes:', err);
        this.isLoading = false;
      },
    });
  }

  private loadRejectRaisons() {
    this.isLoadingReasons = true;
    this.rejectRaisonService.getAllRejectRaisons().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.reasons = res.data.reasons;
          console.log('reasons:', this.reasons);
        } else {
          console.log('err demandes:', this.reasons);
        }
        console.log('res load reject reasons', res);
      },

      error: (err) => {
        console.log('err load reject reasons :', err);
      },
    });
  }
}
