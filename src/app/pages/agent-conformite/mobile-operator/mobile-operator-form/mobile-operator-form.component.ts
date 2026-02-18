import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MobileOperator } from '../models/mobile-operator.model';
import { MobileOperatorService } from '../../../../services/agent-conformite/mobile-operator/mobile-operator.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mobile-operator-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mobile-operator-form.component.html',
  styleUrl: './mobile-operator-form.component.css',
})
export class MobileOperatorForm implements OnInit {
  @Input() operatorId?: number;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() formTitle: string = '';
  @Input() submitButtonText: string = '';
  @Output() onSuccess = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  operatorForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  previewLogo: string | SafeUrl | null = null;
  apiFieldErrors: any = null;

  constructor(
    private fb: FormBuilder,
    private operatorService: MobileOperatorService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.mode === 'edit' && this.operatorId) {
      this.loadOperator();
    }
  }

  initForm(): void {
    this.operatorForm = this.fb.group({
      id: [null],
      // TOUS LES CHAMPS OBLIGATOIRES (sauf logo)
      vcName: ['', [Validators.required, Validators.maxLength(100)]],
      vcContact: ['', [Validators.required, Validators.maxLength(100)]],
      vcPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^[0-9+\s()-]+$/),
        ],
      ],
      vcEmail: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      vcCity: ['', [Validators.required, Validators.maxLength(50)]],
      vcCountry: ['', [Validators.required, Validators.maxLength(50)]],
      vcAddress: ['', [Validators.required, Validators.maxLength(100)]],
      vcLogoPath: ['', [Validators.maxLength(160)]],
      vcAccountName: ['', [Validators.required, Validators.maxLength(100)]],
      vcAccountNumber: ['', [Validators.required, Validators.maxLength(50)]],
      nFees: [
        null,
        [Validators.required, Validators.min(0), Validators.max(999999.9999)],
      ],
      btFeesUsePercent: [false, [Validators.required]],
      btFeesIncluded: [false, [Validators.required]],
    });
  }

  loadOperator(): void {
    if (!this.operatorId) return;
    console.log('Loading operator with ID:', this.operatorId);
    this.loading = true;
    this.operatorService.getById(this.operatorId).subscribe({
      next: (response) => {
        console.log('Operator loaded:', response);
        if (response.status === 200 && response.data) {
          const data = this.mapApiToForm(response.data);
          console.log('Mapped data:', data);
          this.operatorForm.patchValue(data);
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement';
        this.loading = false;
        console.error(error);
      },
    });
  }

  mapApiToForm(apiData: any): any {
    // Gestion de l'aperçu au chargement
    if (apiData.LogoPath) {
      // Si LogoPath n'est pas une URL complète, on ajoute le préfixe de votre serveur
      this.previewLogo = apiData.LogoPath.startsWith('http')
        ? apiData.LogoPath
        : `https://votre-api.com/uploads/${apiData.LogoPath}`;
    }

    return {
      id: apiData.OperatorID,
      vcName: apiData.OperatorName,
      vcContact: apiData.Contact,
      vcPhoneNumber: apiData.PhoneNumber,
      vcEmail: apiData.Email,
      vcCity: apiData.City,
      vcCountry: apiData.Country,
      vcAddress: apiData.Address,
      vcLogoPath: apiData.LogoPath, 
      vcAccountName: apiData.AccountName,
      vcAccountNumber: apiData.AccountNumber,
      nFees: parseFloat(apiData.FeeAmount) || 0,
      btFeesUsePercent:
        apiData.IsPercentage === '1' || apiData.IsPercentage === 1,
      btFeesIncluded: apiData.IsIncluded === '1' || apiData.IsIncluded === 1,
      btEnabled: apiData.IsActive === '1' || apiData.IsActive === 1,
    };
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.apiFieldErrors = null;

    if (file) {
      // 1. On met uniquement le NOM du fichier dans le formulaire (String)
      this.operatorForm.patchValue({
        vcLogoPath: file.name,
      });

      // 2. On crée une URL sécurisée pour l'aperçu (Blob)
      const unsafeUrl = URL.createObjectURL(file);
      this.previewLogo = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);

      this.operatorForm.get('vcLogoPath')?.markAsTouched();
    }
  }

  onResetLogo(): void {
    this.previewLogo = null;
    this.operatorForm.get('vcLogoPath')?.reset();
    this.apiFieldErrors = null;
  }
  onSubmit(): void {
    if (this.operatorForm.invalid) {
      this.markFormGroupTouched(this.operatorForm);
      this.errorMessage =
        'Veuillez remplir tous les champs obligatoires correctement';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.operatorForm.value;

    const operator: MobileOperator = {
      ...formData,
      btFeesUsePercent: formData.btFeesUsePercent ? 1 : 0,
      btFeesIncluded: formData.btFeesIncluded ? 1 : 0,
    };

    const request =
      this.mode === 'create'
        ? this.operatorService.create(operator)
        : this.operatorService.update(operator);
    request.subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loading = false;
        this.onSuccess.emit(response.data);
        if (this.mode === 'create') {
          this.operatorForm.reset();
          this.initForm();
        }
      },
      error: (error) => {
        this.loading = false;

        try {
          const errorResponse = JSON.parse(error.error);
          if (errorResponse.errors && errorResponse.errors.vcAccountName) {
            this.errorMessage = errorResponse.errors.vcAccountName[0];
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          }
        } catch (e) {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }

        console.error(error);
      },
    });
  }

  onReset(): void {
    this.operatorForm.reset();
    this.initForm();
    this.errorMessage = '';
    this.successMessage = '';
  }

  onCancelClick(): void {
    this.onCancel.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private formatErrors(errors: any): string {
    return Object.values(errors).flat().join(', ');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.operatorForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.operatorForm.get(fieldName);
    if (field?.hasError('required')) return 'Ce champ est requis';
    if (field?.hasError('email')) return 'Email invalide';
    if (fieldName === 'vcPhoneNumber' && field?.hasError('pattern')) {
      return 'Format invalide (uniquement des chiffres, +, espaces, () et -)';
    }
    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength'].requiredLength;
      return `Maximum ${maxLength} caractères`;
    }
    if (field?.hasError('min')) return 'La valeur doit être positive';
    if (field?.hasError('max')) return 'La valeur est trop élevée';
    return '';
  }
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9+]/g, '');
    this.operatorForm.patchValue(
      {
        vcPhoneNumber: input.value,
      },
      { emitEvent: false },
    );
  }
}
