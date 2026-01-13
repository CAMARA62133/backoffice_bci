import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/authService/auth.service';
import {ModalsService} from '../../services/modals/modals.service';
import {SharedService} from '../../services/shared/shared.service';
import {UsersService} from '../../services/users/users.service';
import {getErrorMessage, getFormControlClass, isInvalid, isValid,} from '../../core/utils/form-helpers';
import {ActivatedRoute} from '@angular/router';
import {DatatableService} from '../../services/datatable/datatable.service';
import {DataTableDirective} from '../../core/directives/data-table/data-table.directive';

// Déclarer bootstrap pour TypeScript
declare var bootstrap: any;

@Component({
  selector: 'app-utilisteur',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableDirective],
  templateUrl: './utilisteur.component.html',
  styleUrl: './utilisteur.component.css',
})
export class UtilisteurComponent implements OnInit {
  userForm!: FormGroup;

  isLoading: boolean = false;
  isLoadingUser: boolean = false;
  isEditMode: boolean = false;

  roles: any = [];
  users: any = [];
  countries: any = [];

  btEnabled!: number;
  showModalOpenBloquerDebloquer = false;
  isloadingBloquerDebloquer: boolean = false;

  selectedUser: any = null;
  selectedUserId: number | null = null;

  userInfoConfig: any;
  userInfo: any;
  phoneCode: number = 0;
  phoneFormat: string = '';

  phoneMaxLength!: number;
  phoneFirstNumber!: string;

  orgId!: string | number;

  id: number | null = null;

  constructor(
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private datatableService: DatatableService
  ) {
  }

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.userForm, name);
  isValid = (name: string) => isValid(this.userForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.userForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.userForm, name);

  ngOnInit(): void {
    const dataConfig = this.authService.getUserInfoConfig();
    this.userInfo = this.authService.getUserInfo();
    this.orgId = this.userInfo.iOrganisationID;

    console.log('dataConfig : ', dataConfig);
    console.log('userInfo : ', this.userInfo);

    // Recuperer l'ID dans l'url automatiquement
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id') ? Number(params.get('id')) : null;
      console.log('ID = ', this.id);
    });

    if (dataConfig) {
      this.userInfoConfig = {...dataConfig};
      console.log('userInfoConfig : ', this.userInfoConfig);

      this.phoneCode = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'Telephone_Code'
      )?.vcValue;

      this.phoneFormat = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'Telephone_Format'
      )?.vcValue;

      this.phoneMaxLength = this.phoneFormat.length;
      this.phoneFirstNumber = this.phoneFormat.charAt(0);

      console.log('phoneCode : ', this.phoneCode);
      console.log('phoneFormat : ', this.phoneFormat);
      console.log('phoneMaxLength : ', this.phoneMaxLength);
      console.log('phoneFirstNumber : ', this.phoneFirstNumber);
    }

    // Initialiser le formulaire
    this.initForm();

    // Chargement des utilisateurs
    this.loadUsers();

    // Chargement des roles
    this.loadRoles();

    // Chargement des pays
    this.loadCountries();
  }

  /**
   * Initialiser le formulaire de creation d'un utilisateur
   */
  initForm(): void {
    this.userForm = this.fb.group({
      vcLastname: ['', Validators.required],
      vcFirstname: ['', Validators.required],
      vcEmail: ['', [Validators.required, Validators.email]],
      iRoleID: [null, Validators.required],
      vcPhoneNumber: ['',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(this.phoneMaxLength),
          Validators.maxLength(this.phoneMaxLength),
        ]
      ],
      modeOtp: ['', Validators.required],
      idPays: [null, Validators.required],
      vcDescription: ['', Validators.required],
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

    // Vérifier que la longueur totale après collage ne dépasse pas le {phoneMaxLength}
    if (input.value.length + pastedData.length > this.phoneMaxLength) {
      event.preventDefault();
    }
  }

  // Creation Modal
  openCreateModal() {
    this.isEditMode = false;
    this.initForm(); // 🔁 remet tous les Validators.required
    this.userForm.reset(); // Vider le formulaire
    this.modalsService.openModal('createUserModal');
  }

  onToggle(user: any) {
    this.openModal('bloquerDebloquerModal');
    this.selectedUserId = user.id;
    this.btEnabled = +user.btEnabled === 0 ? 1 : 0;
    console.log('Selected user : ', user);
    console.log(this.selectedUserId, this.btEnabled);
  }


  // Ouverture de modal
  openModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);

    if (!isModalOpen) {
      this.modalsService.openModal(modalId);
      this.userForm.reset();
    }

    this.modalsService.closeModal(modalId);
    this.modalsService.closeAllModals();
  }

  // Fermeture de modal
  closeModal(modalId: string) {
    this.modalsService.closeModal(modalId);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.warn('Formulaire invalide, vérifie les champs.');
      return;
    }

    const raw = this.userForm.value;

    console.log(raw);

    // Construire le payload final
    const payload: any = {
      nom: raw.vcLastname,
      prenom: raw.vcFirstname,
      email: raw.vcEmail,
      iRoleID: raw.iRoleID,
      PhoneNumber: raw.vcPhoneNumber,
      modeOtp: raw.modeOtp,
      idPays: raw.idPays,
      // appName: environment.appName,
      vcDescription: raw.vcDescription,
    };

    this.isLoading = true;

    // Appel a l'API
    this.usersService.createUser(payload).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.loadUsers();
          this.userForm.reset();
          this.closeModal('createUserModal');
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }

        console.log('create user res:', res);
        this.isLoading = false;
      },

      error: (err) => {
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Active or Deactive
   * @returns
   */
  bloquerEtDebloquer(): void {
    if (this.isloadingBloquerDebloquer) return; // 🔒 empêche le double clic
    if (this.selectedUserId === null) {
      this.toastr.error('Aucun utilisateur sélectionné.');
      return;
    }

    const params = {
      idUsers: this.selectedUserId,
      btEnabled: this.btEnabled,
    };

    this.usersService.toggleUserStatus(params).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.loadUsers();
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }

        this.showModalOpenBloquerDebloquer = false;
        this.isloadingBloquerDebloquer = false;

        this.modalsService.closeModal('bloquerDebloquerModal');
        console.log('res api : ', res);
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

  /**
   * Charger les utilisateur
   */
  private loadUsers() {
    this.isLoadingUser = true;

    const idToFilter = this.id ? Number(this.id) : null;

    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        const allUsers = res?.data;

        console.log("allUser", {allUsers});
        console.log(this.id, idToFilter)

        // Filtrage si un id est présent
        this.users = idToFilter ? allUsers.filter((user: any) => +user.id === idToFilter) : allUsers;

        console.log('API res:', res);
        console.log('Users filtrés:', this.users);

        this.isLoadingUser = false;
      },

      error: (err) => {
        this.toastr.error(err?.error?.message === 'Unauthorized.' ? "Votre session a expirée." : err.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('api err : ', err);
        this.isLoadingUser = false;
      },
    });
  }

  /**
   * Charger les roles
   */
  private loadRoles() {
    this.isLoading = true;

    this.sharedService.getAllRoles().subscribe({
      next: (res) => {
        // Liste des IDs à exclure
        // const excludedRoleIds = [7, 10];

        if (this.userInfo?.vcRoleName === 'Admin integrateur' || +this.userInfo?.iRoleID === 10) {
          this.roles = (res?.data || []).filter((role: any) => +role.id === 16)
        }

        if (this.userInfo?.vcRoleName === 'Admin integrateur banque' || +this?.userInfo?.iRoleID === 16) {
          this.roles = (res?.data || []).filter((role: any) => +role.id === 7 || +role.id === 3)
        }

        // if (this.userInfo?.vcRoleName === 'Administrateur Système (IT)' || +this?.userInfo?.iRoleID === 7) {
        //   this.roles = (res?.data || []).filter((role: any) => +role.id === 3)
        // }

        // Filtrage des rôles
        // this.roles = (res?.data || []).filter(
        //   // (role: any) => !excludedRoleIds.includes(+role.id)
        //   (role: any) => +role.id === 16
        // );

        // this.roles = res?.data || [];
        console.log('roles:>', this.roles);
        console.log('roles filtrés :>', this.roles);

        console.log('api res : ', res);
        this.isLoading = false;
      },

      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  /**
   * Charger les pays
   */
  private loadCountries() {
    this.isLoading = true;

    this.sharedService.getAllPays().subscribe({
      next: (res) => {
        this.countries = res?.data || [];
        console.log('countries :>', this.roles);


        console.log('api res : ', res);
        this.isLoading = false;
      },

      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
