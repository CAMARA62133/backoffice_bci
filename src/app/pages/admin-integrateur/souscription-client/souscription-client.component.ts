import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NotificationService } from '../../../services/notification/notification.service';
import { SouscriptionClientService } from '../../../services/admin-integrateur/souscription-client.service';
import { CompteClient } from '../models/souscription.client.interface';
import { SkeletonLoaderComponent } from '../../../shared/skeleton/skeleton-loader.component';


@Component({
  selector: 'app-souscription-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SkeletonLoaderComponent,
  ],
  templateUrl: './souscription-client.component.html',
  styleUrl: './souscription-client.component.css',
})
export class SouscriptionClientComponent implements OnInit {
  private fb = inject(FormBuilder);
  public notification = inject(NotificationService);
  private souscriptionService = inject(SouscriptionClientService);

  // États de vérification
  isVerifyingClient = false;
  clientVerified = false;

  comptesDisponibles: CompteClient[] = [];

  transfertForm!: FormGroup;
  currentStep = 1;
  isSubmitting = false;
  stepTitles = ['ID CLIENT', 'COMPTE(S)', 'LIEN ORGANISATION', 'APERÇU'];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.transfertForm = this.fb.group({
      idClient: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      comptesSelectionnes: [[], [Validators.required, Validators.minLength(1)]],
      hasOrganisation: [null, Validators.required],
      lienOrganisation: ['', [Validators.pattern('https?://.+')]],
    });

    // Validation dynamique du lien si "Oui" est coché
    this.transfertForm.get('hasOrganisation')?.valueChanges.subscribe((val) => {
      const lienCtrl = this.transfertForm.get('lienOrganisation');
      if (val === 'oui') {
        lienCtrl?.setValidators([
          Validators.required,
          Validators.pattern('https?://.+'),
        ]);
      } else {
        lienCtrl?.clearValidators();
        lienCtrl?.setValue('');
      }
      lienCtrl?.updateValueAndValidity();
    });

    // Reset de la vérification si l'utilisateur modifie l'ID
    this.transfertForm.get('idClient')?.valueChanges.subscribe(() => {
      this.clientVerified = false;
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.transfertForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  canGoNext(): boolean {
    const c = this.transfertForm.controls;

    if (this.currentStep === 1) {
      return c['idClient'].valid && this.clientVerified;
    }
    if (this.currentStep === 2) {
      return c['comptesSelectionnes'].value?.length > 0;
    }
    if (this.currentStep === 3) {
      if (c['hasOrganisation'].value === 'non') return true;
      if (c['hasOrganisation'].value === 'oui')
        return c['lienOrganisation'].valid;
    }
    return false;
  }

  verifierClient() {
    if (this.f['idClient'].invalid) {
      this.notification.error(
        'Veuillez saisir un ID valide (6 chiffres) avant de vérifier.',
      );
      return;
    }

    this.isVerifyingClient = true;
    this.clientVerified = false;
    this.comptesDisponibles = [];

    this.souscriptionService
      .getInfoCompteClientAjout(this.f['idClient'].value)
      .subscribe({
        next: (res) => {
          this.isVerifyingClient = false;
          if (res.status === 200 && res.comptes?.length) {
            this.clientVerified = true;
            this.comptesDisponibles = res.comptes;
            this.notification.success(
              `Client identifié : ${res.comptes[0].nomCompte}`,
            );
          } else {
            this.notification.error('Aucun compte trouvé pour ce client.');
          }
        },
        error: (err) => {
          this.isVerifyingClient = false;
          this.clientVerified = false;
          this.notification.error('Erreur lors de la vérification du client.');
          console.error(err);
        },
      });
  }

  toggleCompte(compte: CompteClient): void {
    const control = this.transfertForm.get('comptesSelectionnes');
    const currentValues = control?.value || [];
    const isSelected = currentValues.some(
      (c: CompteClient) => c.compte === compte.compte,
    );

    let newValues = isSelected
      ? currentValues.filter((c: CompteClient) => c.compte !== compte.compte)
      : [...currentValues, compte];

    control?.setValue(newValues);
  }

  isCompteSelected(numCompte: string): boolean {
    return this.transfertForm
      .get('comptesSelectionnes')
      ?.value.some((c: CompteClient) => c.compte === numCompte);
  }

  nextStep(): void {
    if (this.canGoNext() && this.currentStep < 4) this.currentStep++;
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  get f() {
    return this.transfertForm.controls;
  }

  validateTransactions(): void {
    if (this.transfertForm.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.notification.success('Souscription validée avec succès');
        this.isSubmitting = false;
      }, 2000);
    }
  }
}
