import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-modifier-mes-infos',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-mes-infos.component.html',
  styleUrl: './modifier-mes-infos.component.css',
})
export class ModifierMesInfosComponent {
  // Gestion de la tabulation
  activeTab: string = 'profile1';
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  // La variable contient les informations de l'utlisateur courrant
  currentUserInfo = {
    vcFirstname: '',
    vcLastname: '',
    email: '',
    vcPhoneNumber: '',
    id: 0,
  };

  // Variables pour la gestion des messages et du chargement
  isLoading: boolean = false;
  modalMessage: string = '';

  message: any = '';
  success: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  // formulaire de changement de password
  changePasswordForm!: FormGroup;

  // Ajouter dans ton composant
  passwordVisibleOld = false;
  passwordVisibleNew = false;
  passwordVisibleConfirm = false;
  password = { old: '', new: '', confirm: '' };

  togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
    if (field === 'old') this.passwordVisibleOld = !this.passwordVisibleOld;
    if (field === 'new') this.passwordVisibleNew = !this.passwordVisibleNew;
    if (field === 'confirm')
      this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
  }

  // A l'initialisation du composant
  ngOnInit(): void {
    const data = this.authService.getUserInfo();
    if (data) this.currentUserInfo = { ...data };
  }

  // Modification des informations de profile
  modifierInfos() {
    this.isLoading = true;

    this.authService
      .modifierProfile(
        this.currentUserInfo.vcLastname,
        this.currentUserInfo.vcFirstname,
        this.currentUserInfo.email,
        this.currentUserInfo.vcPhoneNumber,
        Number(this.currentUserInfo.id)
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.authService.getUserInfo();

          if (response.status === 200) {
            this.success = true;
            this.modalMessage =
              response.message || 'Profil mis à jour avec succès.';
            this.toastr.success(this.modalMessage, '', {
              positionClass: 'toast-custom-center',
            });
          } else {
            this.modalMessage =
              response.message || 'Échec de la mise à jour du profil.';
            this.toastr.error(this.modalMessage, '', {
              positionClass: 'toast-custom-center',
            });
          }
        },
        error: (error: any) => {
          console.error(error);
          this.isLoading = false;
          this.modalMessage = 'Échec de la mise à jour du profil.';
          this.toastr.error(this.modalMessage, '', {
            positionClass: 'toast-custom-center',
          });
        },
      });
  }

  changerMotDePasse(): void {
    // Vérification de la correspondance des mots de passe
    if (this.password.new !== this.password.confirm) {
      this.modalMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Logs utiles pour le débogage
    console.log('Ancien mot de passe :', this.password.old);
    console.log('Nouveau mot de passe :', this.password.new);
    console.log('Email utilisateur :', this.currentUserInfo.email);

    this.isLoading = true;

    // Appel du service
    this.authService
      .updatePassword(
        this.password.old, // ✅ ancien mot de passe
        this.password.new, // ✅ nouveau mot de passe
        this.currentUserInfo.email // ✅ email de l'utilisateur
      )
      .subscribe({
        next: (response: any) => {
          console.log('Réponse API :', response);
          this.isLoading = false;

          if (response?.status === 200 || response?.success) {
            this.modalMessage =
              response?.message || 'Mot de passe changé avec succès.';
            this.toastr.success(this.modalMessage, '', {
              positionClass: 'toast-custom-center',
            });

            // Réinitialiser les champs du formulaire
            this.password = { old: '', new: '', confirm: '' };
          } else {
            this.modalMessage =
              response?.message || 'Échec du changement de mot de passe.';
            this.toastr.success(this.modalMessage, '', {
              positionClass: 'toast-custom-center',
            });
          }
        },
        error: (error: any) => {
          console.error('Erreur API :', error);
          this.isLoading = false;
          this.modalMessage =
            error?.error?.message ||
            'Erreur lors du changement de mot de passe.';
          this.toastr.success(this.modalMessage, '', {
            positionClass: 'toast-custom-center',
          });
        },
      });
  }

  // Fermer les modales
  closeModal() {
    this.modalMessage = '';
  }

  btnClicked() {
    console.log('Boutton clicker');
  }
}
