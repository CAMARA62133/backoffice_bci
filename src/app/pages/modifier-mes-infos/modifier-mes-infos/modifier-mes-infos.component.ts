import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-modifier-mes-infos',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-mes-infos.component.html',
  styleUrl: './modifier-mes-infos.component.css',
})
export class ModifierMesInfosComponent {
  // 🔹 Gestion de la tabulation
  activeTab: string = 'profile1';
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  // 🔹 Informations de l'utilisateur courant
  currentUserInfo = {
    vcFirstname: '',
    vcLastname: '',
    email: '',
    vcPhoneNumber: '',
    id: 0,
  };

  // 🔹 États
  isLoading: boolean = false;
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;
  modalMessage: string = '';

  // 🔹 Changement mot de passe
  passwordVisibleOld = false;
  passwordVisibleNew = false;
  passwordVisibleConfirm = false;
  password = { old: '', new: '', confirm: '' };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const data = this.authService.getUserInfo();
    if (data) this.currentUserInfo = { ...data };
  }

  // ✅ Changer visibilité mot de passe
  togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
    if (field === 'old') this.passwordVisibleOld = !this.passwordVisibleOld;
    if (field === 'new') this.passwordVisibleNew = !this.passwordVisibleNew;
    if (field === 'confirm')
      this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
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

    if (allowedKeys.includes(event.key)) return;

    // Bloquer tout sauf chiffres
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

    // Bloquer si déjà 9 chiffres saisis
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 9) {
      event.preventDefault();
    }
  }

  // Empêcher le collage de texte invalide
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';

    // Autoriser uniquement les chiffres et max 9 caractères
    if (!/^\d{1,9}$/.test(pastedData)) {
      event.preventDefault();
    }

    // Vérifier que la longueur totale après collage ne dépasse pas 9
    const input = event.target as HTMLInputElement;
    if (input.value.length + pastedData.length > 9) {
      event.preventDefault();
    }
  }

  // ✅ Modifier infos profil
  modifierInfos() {
    const phoneNumber = this.currentUserInfo.vcPhoneNumber;

    // Vérifier que le numéro de téléphone a au moins 9 chiffres
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 9) {
      this.toastr.error(
        'Le numéro de téléphone doit contenir au moins 9 chiffres.',
        '',
        { positionClass: 'toast-custom-center' }
      );
      return;
    }

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
          if (response.status === 200) {
            this.toastr.success('Profil mis à jour avec succès', '', {
              positionClass: 'toast-custom-center',
            });
          } else {
            this.toastr.error('Échec de la mise à jour du profil.', '', {
              positionClass: 'toast-custom-center',
            });
          }
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error('Erreur lors de la mise à jour du profil.', '', {
            positionClass: 'toast-custom-center',
          });
        },
      });
  }

  // ✅ Changer mot de passe
  changerMotDePasse(form: NgForm): void {
    // Vérification du formulaire avant tout
    if (form.invalid) {
      Object.values(form.controls).forEach((control) =>
        control.markAsTouched()
      );
      return; // Ne pas appeler l'API
    }

    // Vérifier correspondance des mots de passe
    if (this.password.new !== this.password.confirm) {
      this.toastr.error('Les mots de passe ne correspondent pas.', '', {
        positionClass: 'toast-custom-center',
      });
      return;
    }

    this.isLoading = true;

    this.authService
      .updatePassword(
        this.password.old,
        this.password.new,
        this.currentUserInfo.email
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response?.status === 200 || response?.success) {
            this.toastr.success(response?.message, '', {
              positionClass: 'toast-custom-center',
            });
            this.password = { old: '', new: '', confirm: '' };
            form.resetForm();
          } else {
            this.toastr.error(
              response?.message || 'Échec de la modification.',
              '',
              {
                positionClass: 'toast-custom-center',
              }
            );
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.toastr.error(error.error?.message || 'Erreur API.', '', {
            positionClass: 'toast-custom-center',
          });
        },
      });
  }

  closeModal() {
    this.showSuccessModal = false;
    this.showErrorModal = false;
    this.modalMessage = '';
  }

  btnClicked() {
    console.log('Bouton cliqué');
  }
}
