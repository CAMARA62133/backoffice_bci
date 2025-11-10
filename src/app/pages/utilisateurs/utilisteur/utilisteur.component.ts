import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalsService } from '../../../services/modals/modals.service';
import { SharedService } from '../../../services/shared/shared.service';
import { UsersService } from '../../../services/users/users.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../../utils/form-helpers';

// Déclarer bootstrap pour TypeScript
declare var bootstrap: any;

@Component({
  selector: 'app-utilisteur',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  btEnabled!: number;
  showModalOpenBloquerDebloquer = false;
  isloadingBloquerDebloquer: boolean = false;

  selectedUser: any = null;
  selectedUserId: number | null = null;

  constructor(
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.userForm, name);
  isValid = (name: string) => isValid(this.userForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.userForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.userForm, name);

  ngOnInit(): void {
    this.initForm();

    // Chargement des utilisateurs
    this.loadUsers();

    // Chargement des roles
    this.loadRoles();
  }

  /**
   * Initialiser le formulaire de creation d'un utilisateur
   */
  initForm(): void {
    this.userForm = this.fb.group({
      vcFirstname: ['', Validators.required],
      vcLastname: ['', Validators.required],
      vcPhoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9+()\\-\\s]+$')],
      ],
      vcDescription: ['', Validators.required],
      vcEmail: ['', [Validators.required, Validators.email]],
      iRoleID: [null, Validators.required],
      vcPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
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
      // this.isLoading = true;
      this.userForm.markAllAsTouched();
      console.warn('Formulaire invalide, vérifie les champs.');
      return;
    }

    const raw = this.userForm.value;

    // Construire le payload final
    const payload: any = {
      vcFirstname: raw.vcFirstname,
      vcLastname: raw.vcLastname,
      vcPhoneNumber: raw.vcPhoneNumber, // source unique
      vcDescription: raw.vcDescription,
      vcEmail: raw.vcEmail, // source unique
      iRoleID: raw.iRoleID,
      vcPassword: raw.vcPassword,
    };

    // this.isLoading = false;

    // Appel a l'API
    console.log('Formulaire valide, envoi du payload :', payload);
    console.log('Payload prêt à envoyer', payload);
    this.modalsService.closeAllModals();
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

  private loadUsers() {
    this.isLoadingUser = true;

    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.users = res?.data;
          console.log('users:', this.users);
        } else {
          this.toastr.error(res.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log('api res : ', res);
        this.isLoadingUser = false;
      },
      error: (err) => {
        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('api err : ', err);
        this.isLoadingUser = false;
      },
    });
  }

  private loadRoles() {
    this.isLoading = true;

    this.sharedService.getAllRoles().subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          // Liste des IDs à exclure
          const excludedRoleIds = [7, 10];

          // Filtrage des rôles
          this.roles = (res?.data || []).filter(
            (role: any) => !excludedRoleIds.includes(+role.id)
          );

          // this.roles = res?.data || [];
          console.log('roles:>', this.roles);
          console.log('roles filtrés :>', this.roles);
        } else {
          this.toastr.error(res.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
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
