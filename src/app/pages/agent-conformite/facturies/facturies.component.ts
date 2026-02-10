import { NgClass, NgForOf, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import 'datatables.net-bs5';
import { Config } from 'datatables.net-bs5';
import 'datatables.net-buttons-dt';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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

import 'datatables.net-select';

@Component({
  selector: 'app-facturies',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgClass,
    ɵInternalFormsSharedModule,
    DataTablesModule,
  ],
  templateUrl: './facturies.component.html',
  styleUrl: './facturies.component.css',
})
export class FacturiesComponent implements OnInit {
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

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

  isCheckedFeesIncluded: boolean = false;
  isCheckedFeesUsePercent: boolean = false;
  isCheckedFeedsBankUsePercent: boolean = false;

  selectedFacturierId: number | null = null;
  btEnabled: boolean = false;
  showModalOpenBloquerDebloquer: boolean = false;
  isloadingBloquerDebloquer: boolean = false;

  isEditMode: boolean = false;
  // =================
  existingLogoPath!: any;

  // ===================
  previewUrl: string | null = null;

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

    this.dtoptions = {
      paging: true,
      pagingType: 'full_numbers',
      // lengthMenu:[5, 10, 15, 20, 25, 30, 35, 50],
      // pageLength:8,
      scrollY: '350',

      language: {
        processing: 'Traitement en cours...',
        search: 'Rechercher&nbsp;:',
        lengthMenu: 'Afficher _MENU_ &eacute;l&eacute;ments',
        info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:
          "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:
          '(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)',
        infoPostFix: '',
        loadingRecords: 'Chargement en cours...',
        zeroRecords: 'Aucun &eacute;l&eacute;ment &agrave; afficher',
        emptyTable: 'Aucune donnée disponible dans le tableau',
        paginate: {
          first: 'Premier',
          previous: 'Pr&eacute;c&eacute;dent',
          next: 'Suivant',
          last: 'Dernier',
        },
      },

      select: true,
    };
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
      vcLogoPath: [''],
      // vcLogoPath: ['', this.isEditMode ? [] : Validators.required],
      vcAccountName: ['', Validators.required],
      vcAccountNumber: ['', [Validators.required, Validators.min(0)]],

      // Bank Fees
      nFeesBank: [0, [Validators.required, Validators.min(0)]],
      btFeesBankUsePercent: [false],

      // Partner Fees
      nFees: [0, [Validators.required, Validators.min(0)]],
      btFeesUsePercent: [false],

      // Fees Included
      btFeesIncluded: [false],
    });
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
    if (!this.isEditMode) {
      this.factForm.get('vcLogoPath')?.setValidators([Validators.required]);
      this.factForm.get('vcLogoPath')?.updateValueAndValidity();
    }

    if (this.factForm.invalid) {
      this.factForm.markAllAsTouched();
      return;
    }

    // =================================================================================
    const formData = new FormData();
    const fileToUpload = this.factForm.get('vcLogoPath')?.value;

    formData.append('logo', fileToUpload);
    formData.append('vcName', this.factForm.value.vcName);
    formData.append('vcContact', this.factForm.value.vcContact);
    formData.append('vcPhoneNumber', this.factForm.value.vcPhoneNumber);
    formData.append('vcEmail', this.factForm.value.vcEmail);
    formData.append('vcCity', this.factForm.value.vcCity);
    formData.append('vcCountry', this.factForm.value.vcCountry);
    formData.append('vcAddress', this.factForm.value.vcAddress);
    formData.append('vcAccountName', this.factForm.value.vcAccountName);
    formData.append('vcAccountNumber', this.factForm.value.vcAccountNumber);
    formData.append('nFeesBank', this.factForm.value.nFeesBank);
    formData.append('nFees', this.factForm.value.nFees);

    formData.append(
      'btFeesIncluded',
      this.factForm.value.btFeesIncluded ? '1' : '0',
    );

    formData.append(
      'btFeesUsePercent',
      this.factForm.value.btFeesUsePercent ? '1' : '0',
    );

    formData.append(
      'btFeesBankUsePercent',
      this.factForm.value.btFeesBankUsePercent ? '1' : '0',
    );

    formData.forEach((key, value) => {
      console.log('formData - key:', key, 'value:', value);
    });

    console.log(this.factForm.value.btFeesBankUsePercent ?? false);
    console.log(typeof this.factForm.value.btFeesBankUsePercent);

    console.log(this.factForm.value.btFeesIncluded ?? false);
    console.log(typeof this.factForm.value.btFeesIncluded);

    console.log(this.factForm.value.btFeesUsePercent ?? false);
    console.log(typeof this.factForm.value.btFeesUsePercent);

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

        console.error('❌ Erreur lors de la création :', err?.message);

        this.loadFacturies();
        this.isLoading = false;
        this.modalsService.closeAllModals();
      },
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // 1. Mettre le fichier dans le formulaire pour l'envoi
      this.factForm.patchValue({ vcLogoPath: file });

      // 2. Créer l'aperçu visuel (Le fameux BLOB)
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Ajouter une validation
      this.factForm.get('vcLogoPath')?.updateValueAndValidity();
    }
  }

  onEditFacturie(facturier: any) {
    this.isEditMode = true;
    this.openModal('updateFacturieModal');
    this.setFormForEdit(facturier);
    this.selectedFacturier = facturier;

    console.log(facturier);
    this.selectedFacturierId = facturier.id;

    this.existingLogoPath = facturier.vcLogoPath;
    console.log(this.existingLogoPath);
    console.log(facturier.vcLogoPath);
    this.cd.detectChanges();
  }

  // A la modification
  onUpdateFacturie() {
    if (this.factForm.invalid) {
      this.factForm.markAllAsTouched();
      console.log('Formulaire invalide !');
      return;
    }

    const formData = new FormData();

    // formData.append('logo', fileToUpload ?? this.selectedFacturier.vcLogoPath);
    // --- GESTION INTELLIGENTE DU LOGO ---
    const fileToUpload = this.factForm.get('vcLogoPath')?.value;

    if (fileToUpload instanceof File) {
      // CAS 1 : C'est un nouveau fichier (objet File)
      formData.append('logo', fileToUpload);
    } else {
      // CAS 2 : Pas de nouveau fichier sélectionné
      // On renvoie l'ancien chemin/nom pour que le backend sache quoi garder
      // 'existingLogoPath' contient l'URL ou le nom que tu as récupéré au chargement
      formData.append('logo', this.selectedFacturier.vcLogoPath);
    }

    // Ajout des autres champs
    formData.append('vcName', this.factForm.value.vcName);
    formData.append('vcContact', this.factForm.value.vcContact);
    formData.append('vcPhoneNumber', this.factForm.value.vcPhoneNumber);
    formData.append('vcEmail', this.factForm.value.vcEmail);
    formData.append('vcCity', this.factForm.value.vcCity);
    formData.append('vcCountry', this.factForm.value.vcCountry);
    formData.append('vcAddress', this.factForm.value.vcAddress);
    formData.append('vcAccountName', this.factForm.value.vcAccountName);
    formData.append('vcAccountNumber', this.factForm.value.vcAccountNumber);
    formData.append('nFeesBank', this.factForm.value.nFeesBank);
    formData.append('nFees', this.factForm.value.nFees);

    // Conversion des booleens en string '1'/'0' pour FormData
    formData.append(
      'btFeesIncluded',
      this.factForm.value.btFeesIncluded === true ? '1' : '0',
    );
    formData.append(
      'btFeesUsePercent',
      this.factForm.value.btFeesUsePercent === true ? '1' : '0',
    );
    formData.append(
      'btFeesBankUsePercent',
      this.factForm.value.btFeesBankUsePercent === true ? '1' : '0',
    );

    formData.append('iMerchandID', String(this.selectedFacturierId));

    formData.forEach((key, value) => {
      console.log('formData - key:', value, 'value:', key);
    });

    this.isLoading = true;

    this.facturiesService.updateFacturier(formData).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.loadFacturies();
          this.modalsService.closeAllModals();
          this.dttrigger.next(null);
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log('res update:', res);
        this.isLoading = false;
      },

      error: (err) => {
        this.toastr.error('❌ Une erreur interne est survenue', '', {
          positionClass: 'toast-custom-center',
        });

        console.log('Erreur update:', err);
        console.log('Erreur update:', err?.message);
        this.isLoading = false;
        this.modalsService.closeAllModals();
        this.dttrigger.next(null);
      },
    });
  }

  //
  onToggleFacturier(facturier: any) {
    this.openModal('bloquerDebloquerModal');
    this.btEnabled = facturier.btEnabled;
    this.selectedFacturierId = facturier.id;
    console.log('Selected facturier : ', facturier);
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
      iMerchandID: this.selectedFacturierId,
      btEnabled: this.btEnabled === true ? 0 : 1,
    };
    console.log(params);

    this.facturiesService.toggleFacturier(params).subscribe({
      next: (res) => {
        this.showModalOpenBloquerDebloquer = false;
        this.isloadingBloquerDebloquer = false;

        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });

        this.modalsService.closeModal('bloquerDebloquerModal');
        console.log('res api : ', res);
        this.loadFacturies();
      },

      error: (err) => {
        this.toastr.error(
          'Une erreur interne est survenue lors du blocage',
          '',
          {
            positionClass: 'toast-custom-center',
          },
        );
        console.log('err api : ', err);
        this.isloadingBloquerDebloquer = false;
        this.modalsService.closeModal('bloquerDebloquerModal');
      },
    });
  }

  // Charger les facturies
  private loadFacturies() {
    this.isLoadingFacturies = true;
    this.facturiesService.getAllFacturies().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.facturies = res.data || [];
          this.dttrigger.next(null);

          console.log('liste des facturiers:', this.facturies);
          // Charger les images pour chaque facturier
          this.facturies.forEach((f: any) => {
            if (f.vcLogoPath) {
              this.loadFacturierImage(f.vcLogoPath, f);
            }
          });
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

  // Charger l'image d'un facturier
  private loadFacturierImage(imageName: string, facturier: any) {
    if (!facturier.vcLogoPath) {
      facturier.vcLogoPath = 'assets/defaultFacturierLogo.png';
      return;
    }
    this.facturiesService.getFacturierImage(imageName).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        facturier.vcLogoPath = url; // on stocke l’URL dans l’objet
      },
      error: (err) => {
        console.error('Erreur chargement image', err);
        facturier.vcLogoPath = 'assets/defaultFacturierLogo.png';
      },
    });
  }

  private setFormForEdit(facturier: any) {
    this.factForm.patchValue({
      vcName: facturier.FacturierName,
      vcContact: facturier.vcContact,
      vcPhoneNumber: facturier.vcPhoneNumber,
      vcEmail: facturier.vcEmail,
      vcCity: facturier.vcCity,
      vcCountry: facturier.vcCountry,
      vcAddress: facturier.vcAddress,
      vcLogoPath: '', // Laisser vide pour ne pas modifier le logo
      vcAccountName: facturier.vcAccountName,
      vcAccountNumber: facturier.vcAccountNumber,
      nFeesBank: facturier.nFeesBank,
      nFees: facturier.nFees,
      btFeesBankUsePercent: facturier.btFeesBankUsePercent,
      btFeesUsePercent: facturier.btFeesUsePercent,
      btFeesIncluded: facturier.btFeesIncluded,
    });

    // Supprimer le required de vcLogoPath si tu es en édition
    this.factForm.get('vcLogoPath')?.clearValidators();
    this.factForm.get('vcLogoPath')?.updateValueAndValidity();
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

  onCheckboxChange(name: string) {
    const value = this.factForm.get(name)?.value;
    console.log(`${name} changé →`, value);
  }
}
