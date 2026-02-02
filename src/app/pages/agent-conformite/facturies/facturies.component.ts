import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { FacturierListing } from '../../../core/interfaces/facturies.interface';
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

  // Selected Facturie
  selectedFacturier!: FacturierListing;
  idFacturier!: number;
  btEnabled!: boolean;
  isloadingBloquerDebloquer: boolean = false;
  showModalOpenBloquerDebloquer: boolean = false;
  selectedFacturierId: number | null = null;

  constructor(
    private facturiesService: FacturiesService,
    private toastr: ToastrService,
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
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

  onEditFacturie(facturier: FacturierListing) {
    this.openModal('updateFacturieModal');
    this.selectedFacturier = facturier;
    this.idFacturier = this.selectedFacturier.id;

    console.log('facturie : ', facturier);
    console.log('Selected facturier : ', this.selectedFacturier);
    console.log('Selected facturier ID : ', this.idFacturier);

    this.factForm.patchValue({
      vcName: this.selectedFacturier.FacturierName,
      vcContact: this.selectedFacturier.vcContact,
      vcPhoneNumber: this.selectedFacturier.vcPhoneNumber,
      vcEmail: this.selectedFacturier.vcEmail,
      vcCity: this.selectedFacturier.vcCity,
      vcCountry: this.selectedFacturier.vcCountry,
      vcAddress: this.selectedFacturier.vcAddress,
      vcLogoPath: '',
      vcAccountName: this.selectedFacturier.vcAccountName,
      vcAccountNumber: this.selectedFacturier.vcAccountNumber,
      nFeesBank: this.selectedFacturier.nFeesBank,
      btFeesBankUsePercent: this.selectedFacturier.btFeesBankUsePercent ? 1 : 0,
      nFees: this.selectedFacturier.nFees,
      btFeesUsePercent: this.selectedFacturier.btFeesUsePercent ? 1 : 0,
      btFeesIncluded: this.selectedFacturier.btFeesIncluded ? 1 : 0,
    });

    this.cd.detectChanges();
  }

  // A la modification
  onUpdateFacturie() {
    if (this.factForm.invalid) {
      this.factForm.markAllAsTouched();
      console.log('Formulaire invalide !');
      return;
    }

    const formData = {
      ...this.factForm.value,
      iMerchandID: this.selectedFacturier.id,
    };

    console.log('Data to send : ', formData);
    this.isLoading = true;

    this.facturiesService.updateFacturier(formData).subscribe({
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
        console.log('res update:', res);
        this.isLoading = false;
      },

      error: (err) => {
        this.toastr.error('❌ Erreur lors de la mise à jour', '', {
          positionClass: 'toast-custom-center',
        });
        console.log('Erreur update:', err);
        console.log('Erreur update:', err?.message);
        this.isLoading = false;
        this.modalsService.closeAllModals();
      },
    });
  }

  //
  onToggleFacturier(facturier: any) {
    this.openModal('bloquerDebloquerModal');
    this.selectedFacturierId = facturier.id;
    this.btEnabled = facturier.btEnabled === '0';
    console.log('facturier to toggle : ', facturier);
  }

  bloquerEtDebloquer() {
    if (this.isloadingBloquerDebloquer) return;
    if (this.selectedFacturierId === null) {
      this.toastr.error('Aucun facturier sélectionnée.', '', {
        positionClass: 'toast-custom-center',
      });
      return;
    }

    this.isloadingBloquerDebloquer = true;
    const params = {
      iMerchandID: this.idFacturier,
      btEnabled: this.btEnabled === true ? 0 : 1,
    };
    console.log(params);

    // this.facturiesService.toggleFacturier(params).subscribe({
    //   next: (res) => {
    //     this.showModalOpenBloquerDebloquer = false;
    //     this.isloadingBloquerDebloquer = false;

    //     this.toastr.success(res?.message, '', {
    //       positionClass: 'toast-custom-center',
    //     });

    //     this.modalsService.closeModal('bloquerDebloquerModal');
    //     console.log('res api : ', res);
    //     this.loadFacturies();
    //   },

    //   error: (err) => {
    //     this.toastr.error(
    //       'Une erreur interne est survenue lors du blocage',
    //       '',
    //       {
    //         positionClass: 'toast-custom-center',
    //       },
    //     );
    //     console.log('err api : ', err);
    //     this.isloadingBloquerDebloquer = false;
    //     this.modalsService.closeModal('bloquerDebloquerModal');
    //   },
    // });
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
      vcAccountNumber: ['', [Validators.required, Validators.min(0)]],
      nFeesBank: ['', [Validators.required, Validators.min(0)]],
      nFees: ['', [Validators.required, Validators.min(0)]],
      btFeesBankUsePercent: [
        '1',
        [Validators.required, Validators.pattern('^(0|1)$')],
      ],
      btFeesUsePercent: [
        '0',
        [Validators.required, Validators.pattern('^(0|1)$')],
      ],
      btFeesIncluded: [
        '0',
        [Validators.required, Validators.pattern('^(0|1)$')],
      ],
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
