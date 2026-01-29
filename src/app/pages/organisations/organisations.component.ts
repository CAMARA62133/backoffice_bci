import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environnements/environnement';
import { DataTableDirective } from '../../core/directives/data-table/data-table.directive';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../core/utils/form-helpers';
import { AuthService } from '../../services/auth/authService/auth.service';
import { RolesService } from '../../services/auth/roles/roles.service';
import { ModalsService } from '../../services/modals/modals.service';
import { OrganisationsService } from '../../services/organisations/organisations.service';

@Component({
  selector: 'app-organisations',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    DataTableDirective,
    RouterLink,
  ],
  templateUrl: './organisations.component.html',
  styleUrl: './organisations.component.css',
})
export class OrganisationsComponent implements OnInit {
  // Liste des organisations
  orgForm!: FormGroup;
  isLoading: boolean = false;
  isLoadingOrgs: boolean = false;
  isLoadingCountry: boolean = false;

  roles: any[] = [];
  filteredRole: any = {};
  organisations: any[] = [];
  currentUser: any;

  countries: any[] = [];

  createOrgModalId: string = 'createOrgModal';
  lienSite: string = environment.lienSite;

  // Gestion de la pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  pagedOrganisations: any[] = [];

  selectedOrg: any = null;
  selectedOrgId: number | null = null;

  country = '';
  phoneCode!: number;
  phoneFormat = '';
  currency = '';
  appVersion!: number;
  phoneMaxLength!: number;
  phoneFirstNumber!: string;

  btEnabled!: number;
  showModalOpenBloquerDebloquer = false;
  isloadingBloquerDebloquer: boolean = false;

  isEditMode: boolean = true;
  idUsers!: number | string;

  id!: number | null;
  org!: any[];

  constructor(
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private orgService: OrganisationsService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.orgForm, name);
  isValid = (name: string) => isValid(this.orgForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.orgForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.orgForm, name);

  ngOnInit(): void {
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

    // initialiser le formulaire
    this.initForm();

    // Chargement des donnees
    this.loadRoles();
    this.loadOrganisations();
    this.loadListePays();
  }

  // Initialiser le formulaire
  initForm() {
    this.orgForm = this.fb.group({
      vcOrgName: ['', Validators.required],
      vcOrgContact: ['', Validators.required],
      vcOrgPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(this.phoneMaxLength),
          Validators.maxLength(this.phoneMaxLength),
        ],
      ],
      vcOrgEmail: ['', [Validators.required, Validators.email]],
      vcOrgCity: ['', Validators.required],
      vcOrgCountry: ['', Validators.required],
      vcOrgAddress: ['', Validators.required],
      vcOrgLogoPath: ['', Validators.required],
      vcBusinessEmailDomain: ['', [Validators.required]],

      // Pour les infos utilisateurs
      vcFirstname: ['', Validators.required],
      vcLastname: ['', Validators.required],
      vcDescription: ['', Validators.required],
      iRoleID: ['', Validators.required],

      // Mode d'envoie des OTPs
      modeOtp: ['', Validators.required],
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

  openCreateModal() {
    this.isEditMode = false;
    this.initForm(); // 🔁 remet tous les Validators.required
    this.orgForm.reset(); // Vider le formulaire
    this.modalsService.openModal('createOrgModal');
  }

  // Ouverture de modal
  openModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);

    if (!isModalOpen) {
      this.modalsService.openModal(modalId);
      this.orgForm.reset();
    }

    this.modalsService.closeModal(modalId);
    this.modalsService.closeAllModals();
  }

  closeModal(modalId: string) {
    this.modalsService.closeModal(modalId);
  }

  // Create organisation
  onSubmit() {
    if (this.orgForm.invalid) {
      this.orgForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Préparer les données à envoyer
    const formData = this.orgForm.value;

    // Ajouter les champs automatiques
    const dataToSend = {
      appName: environment.appName,
      vcOrgName: formData.vcOrgName,
      vcOrgContact: formData.vcOrgContact,
      vcOrgPhoneNumber: formData.vcOrgPhoneNumber,
      vcOrgEmail: formData.vcOrgEmail,
      vcOrgCity: formData.vcOrgCity,
      vcOrgCountry: formData.vcOrgCountry,
      vcOrgAddress: formData.vcOrgAddress,
      vcOrgLogoPath: formData.vcOrgLogoPath,
      vcBusinessEmailDomain: formData.vcBusinessEmailDomain,
      vcFirstname: formData.vcFirstname,
      vcLastname: formData.vcLastname,
      vcDescription: formData.vcDescription,
      vcUserEmail: formData.vcOrgEmail,
      iRoleID: formData.iRoleID,
      vcPhoneNumber: formData.vcOrgPhoneNumber,
      iParentID: this.currentUser.id,
      lienSite: this.lienSite,
      modeOtp: formData.modeOtp,
    };

    // appel a l'API de creation d'une organisation
    this.orgService.createOrganisation(dataToSend).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          console.log('Parametres envoyees : ', dataToSend);

          this.toastr.success(res.message, '', {
            positionClass: 'toast-custom-center',
          });

          this.loadOrganisations();

          this.orgForm.reset();
          this.modalsService.closeAllModals();
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }

        this.isLoading = false;
        console.log('✅ Organisation création :', res);
      },

      error: (err) => {
        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });

        console.error('❌ Erreur lors de la création :', err);
        this.isLoading = false;

        this.modalsService.closeAllModals();
      },
    });
  }

  setOptionalFieldsForEdit() {
    // Supprimer la validation du logo si on est en mode édition
    this.orgForm.get('vcOrgLogoPath')?.clearValidators();
    this.orgForm.get('vcOrgLogoPath')?.updateValueAndValidity();

    // Si tu veux, tu peux aussi rendre d'autres champs optionnels
    this.orgForm.get('vcDescription')?.clearValidators();
    this.orgForm.get('vcDescription')?.updateValueAndValidity();
  }

  // Open de edit modal form with correct information
  onEdit(org: any) {
    this.isEditMode = true;
    this.initForm();

    this.modalsService.openModal('updateOrgModal');
    this.selectedOrg = { ...org };
    this.selectedOrgId = this.selectedOrg.id;

    this.idUsers = this.selectedOrg.idUsers;

    console.log('selected org : ', this.selectedOrg);

    // 🧱 Remplir le formulaire avec les données existantes
    this.orgForm.patchValue({
      vcOrgName: this.selectedOrg.organisationName,
      vcOrgContact: this.selectedOrg.vcContact,
      vcOrgPhoneNumber: this.selectedOrg.vcPhoneNumber,
      vcOrgEmail: this.selectedOrg.vcEmail,
      vcOrgCity: this.selectedOrg.vcCity,
      vcOrgCountry: this.selectedOrg.vcCountry,
      vcOrgAddress: this.selectedOrg.vcAddress,
      vcOrgLogoPath: '',
      vcBusinessEmailDomain: this.selectedOrg.vcBusinessEmailDomain,

      vcFirstname: this.selectedOrg.vcFirstnameUsers,
      vcLastname: this.selectedOrg.vcLastnameUsers,
      vcDescription: this.selectedOrg.vcDescription,
      iRoleID: this.selectedOrg.iRoleID,
      modeOtp: this.selectedOrg.modeOtp || 'Email',
    });

    // 🧩 Retirer la validation "required" pour le champ logo uniquement en modification
    this.orgForm.get('vcOrgLogoPath')?.clearValidators();
    this.orgForm.get('vcOrgLogoPath')?.updateValueAndValidity();

    this.cd.detectChanges();
  }

  // Update the informations
  onUpdate() {
    this.orgForm.get('vcOrgLogoPath')?.clearValidators();
    this.orgForm.get('vcOrgLogoPath')?.updateValueAndValidity();

    if (this.orgForm.invalid) {
      this.orgForm.markAllAsTouched();
      console.log('invalid forms');
      // console.log(this.orgForm.value);
      return;
    }

    this.isLoading = true;
    console.log(this.orgForm.value);

    // On récupère les données du formulaire
    const formData = {
      ...this.orgForm.value,
      iOrganisationID: this.selectedOrgId,
    };

    console.log('form data : ', formData);

    // On construit l'objet a envoyer
    const dataToSend = {
      iOrganisationID: this.selectedOrgId,
      vcOrgName: formData.vcOrgName,
      vcOrgContact: formData.vcOrgContact,
      vcOrgPhoneNumber: formData.vcOrgPhoneNumber,
      vcOrgEmail: formData.vcOrgEmail,
      vcOrgCity: formData.vcOrgCity,
      vcOrgCountry: formData.vcOrgCountry,
      vcOrgAddress: formData.vcOrgAddress,
      vcOrgLogoPath: formData.vcOrgLogoPath,
      vcBusinessEmailDomain: formData.vcBusinessEmailDomain,
      vcDescription: formData.vcDescription,
      modeOtp: formData.modeOtp,

      iUserID: this.idUsers,
      vcFirstname: formData.vcFirstname,
      vcLastname: formData.vcLastname,
      vcUserEmail: formData.vcOrgEmail,
      vcPhoneNumber: formData.vcOrgPhoneNumber,
      iRoleID: formData.iRoleID,
    };

    console.log('🟢 Données envoyées :', dataToSend);

    // Appel au service de modification
    // console.log('Appel au service de modification');
    this.orgService.updateOrganisation(dataToSend).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.orgForm.reset();
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log('updating : ', res);
        this.loadOrganisations();
        this.modalsService.closeAllModals();
      },
      error: (err) => {
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('error updating : ', err);
      },
    });

    this.modalsService.closeAllModals();
  }

  // onToggle
  onToggle(organisation: any) {
    this.openModal('bloquerDebloquerModal');
    this.selectedOrgId = organisation.id;
    this.btEnabled = +organisation.btEnabled === 0 ? 1 : 0;
    console.log('Selected organisation : ', organisation);
    console.log(this.selectedOrgId, this.btEnabled);
  }

  // Active or Deactive
  bloquerEtDebloquer(): void {
    if (this.isloadingBloquerDebloquer) return; // 🔒 empêche le double clic
    if (this.selectedOrgId === null) {
      this.toastr.error('Aucune organisation sélectionnée.');
      return;
    }

    const params = {
      idOrganisation: this.selectedOrgId,
      btEnabled: this.btEnabled,
    };

    this.orgService.toggleActiveOrDesactiveOrg(params).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.loadOrganisations();
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log('res api : ', res);
        this.showModalOpenBloquerDebloquer = false;
        this.isloadingBloquerDebloquer = false;
        this.modalsService.closeModal('bloquerDebloquerModal');
      },

      error: (err) => {
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err api : ', err);
        this.isloadingBloquerDebloquer = false;
        this.modalsService.closeModal('bloquerDebloquerModal');
      },
    });
  }

  // Fonction priver pour Recharger automatiquement la liste des organisations
  private loadOrganisations() {
    this.isLoadingOrgs = true;
    this.orgService.getOrganisations().subscribe({
      next: (res) => {
        this.organisations = res.data;
        this.isLoadingOrgs = false;
        console.log(res);
      },

      error: (err) => {
        console.error('Erreur chargement organisations', err);
        this.isLoadingOrgs = false;
      },
    });
  }

  private loadRoles(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.roles = res.data;
        this.filteredRole = this.roles.find((role) => role.id === '7');

        console.log('liste roles : ', this.roles);
        console.log('filteredRole : ', this.filteredRole);

        console.log('Erreur chargement des rôles : ', res);
      },

      error: (err) => {
        this.isLoading = false;
        console.error('Erreur chargement des rôles :', err.message);
      },
    });
  }

  private loadListePays(): void {
    this.isLoadingCountry = true;
    this.orgService.getListePays().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.countries = res?.data;

        console.log(this.countries);
        console.log(res);
      },

      error: (err) => {
        console.log(err);
        this.isLoadingCountry = false;
      },
    });
  }
}
