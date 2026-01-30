import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from '../../../core/directives/data-table/data-table.directive';
import { FacturiesService } from '../../../core/node/services/facturies/facturies.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../../core/utils/form-helpers';
import { AuthService } from '../../../services/auth/authService/auth.service';
import { ModalsService } from '../../../services/modals/modals.service';

@Component({
  selector: 'app-facturies',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    DataTableDirective,
    NgForOf,
    NgIf,
    NgClass,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './facturies.component.html',
  styleUrl: './facturies.component.css',
})
export class FacturiesComponent implements OnInit {
  isLoadingFacturies: boolean = false;
  facturies!: any;
  factForm!: FormGroup;
  isLoading: boolean = false;

  //===============
  country = '';
  phoneCode!: number;
  phoneFormat = '';
  currency = '';
  appVersion!: number;
  phoneMaxLength!: number;
  phoneFirstNumber!: string;

  currentUser: any;
  //================

  constructor(
    private facturiesService: FacturiesService,
    private toastr: ToastrService,
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.factForm, name);
  isValid = (name: string) => isValid(this.factForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.factForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.factForm, name);

  ngOnInit() {
    this.modalsService.closeAllModals();

    const userData = this.authService.getUserInfo();
    if (userData) {
      this.currentUser = userData;
    }

    const config = this.authService.getUserInfoConfig();
    console.log(config);

    this.country = config.organisation.find(
      (c: any) => c.vcKey === 'Pays',
    )?.vcValue;

    this.phoneCode = config.organisation.find(
      (c: any) => c.vcKey === 'Telephone_Code',
    )?.vcValue;

    this.phoneFormat = config.organisation.find(
      (c: any) => c.vcKey === 'Telephone_Format',
    )?.vcValue;
    this.phoneMaxLength = this.phoneFormat.length;

    this.currency = config.organisation.find(
      (c: any) => c.vcKey === 'Devise',
    )?.vcValue;

    this.appVersion = config.appVersion;
    this.phoneFirstNumber = this.phoneFormat.charAt(0);

    console.log('country : ', this.country);
    console.log('phoneCode : ', this.phoneCode);
    console.log('phoneFormat : ', this.phoneFormat);
    console.log('currency : ', this.currency);
    console.log('phoneMaxLength : ', this.phoneMaxLength);
    console.log('phoneFirstNumber : ', this.phoneFirstNumber);

    this.loadFacturies();
    this.initForm();
  }

  openModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);

    if (!isModalOpen) {
      this.modalsService.openModal(modalId);
      this.factForm.reset();
    }

    this.modalsService.closeModal(modalId);
    this.modalsService.closeAllModals();
  }

  // A la soumission du formulaire
  onCreateFacturie() {
    if (this.factForm.invalid) {
      this.factForm.markAllAsTouched();
      return;
    }

    const formData = this.factForm.value;
    console.log(formData);

    this.isLoading = true;

    this.facturiesService.addFacturier(formData).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });

          this.loadFacturies();
          this.modalsService.closeAllModals();
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        this.isLoading = false;
        console.log(res);
      },

      error: (err) => {
        this.toastr.error('❌ Erreur lors de la création', '', {
          positionClass: 'toast-custom-center',
        });

        console.error('❌ Erreur lors de la création :', err);

        this.loadFacturies();
        this.isLoading = false;
        this.modalsService.closeAllModals();
      },
    });
  }

  // Initialisation du formulaire
  private initForm() {
    this.factForm = this.fb.group({
      vcName: ['', Validators.required],
      vcContact: ['', Validators.required],
      vcPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(this.phoneMaxLength),
          Validators.maxLength(this.phoneMaxLength),
        ],
      ],
      vcEmail: ['', [Validators.required, Validators.email]],
      vcCity: ['', Validators.required],
      vcCountry: ['', Validators.required],
      vcAddress: ['', Validators.required],
      vcLogoPath: ['', Validators.required],
      vcAccountName: ['', Validators.required],
      vcAccountNumber: ['', Validators.required],
      nFeesBank: ['', Validators.required],
      btFeesBankUsePercent: ['', Validators.required],
      nFees: ['', Validators.required],
      btFeesUsePercent: ['', Validators.required],
      btFeesIncluded: ['', Validators.required],
    });
  }

  // Charger les facturies
  private loadFacturies() {
    this.isLoadingFacturies = true;
    this.facturiesService.getAllFacturies().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.facturies = res.data || [];
          console.log({ facturies: this.facturies });
          // this.isLoadingFacturies = false;
        } else {
          this.toastr.error('Erreur lors du chargement des facturies.', '', {
            positionClass: 'toast-custom-center',
          });
        }
        this.isLoadingFacturies = false;
        console.log(res);
      },

      error: (err) => {
        this.toastr.error('Une erreur interne est survenue.', '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err facturies list:', err);
        this.isLoadingFacturies = false;
      },
    });
  }

  // Empêcher la saisie de lettres, caractères spéciaux et espaces
  onlyDigits(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
    ];

    const input = event.target as HTMLInputElement;

    if (allowedKeys.includes(event.key)) return;

    // Bloquer tout sauf chiffres
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

    // Si l'utilisateur essaie de taper le premier chiffre
    if (input.value.length === 0 && event.key !== this.phoneFirstNumber) {
      event.preventDefault();
      return;
    }

    // Optionnel : bloquer si déjà max de chiffres saisis
    if (input.value.length >= this.phoneMaxLength) {
      event.preventDefault();
    }
  }

  // Empêcher le collage de texte invalide
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';
    const input = event.target as HTMLInputElement;

    const regex = new RegExp(`^\\d{1,${this.phoneMaxLength}}$`);
    if (!regex.test(pastedData)) {
      event.preventDefault();
      return;
    }

    const finalValue = input.value + pastedData;
    if (
      finalValue.length > 0 &&
      finalValue.charAt(0) !== this.phoneFirstNumber
    ) {
      event.preventDefault();
      return;
    }

    // Vérifier que la longueur totale après collage ne dépasse pas 9
    if (input.value.length + pastedData.length > this.phoneMaxLength) {
      event.preventDefault();
    }
  }
}
