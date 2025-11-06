import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/authService/auth.service';

interface OrganisationItem {
  vcKey: string;
  vcValue: string;
}

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

  userInfoConfig: any;
  country: string = '';
  phoneCode: number = 0;
  phoneFormat: string = '';
  currency: string = '';

  phoneMaxLengthNumber: number = 0;
  firstNumberPhone: number = 0;

  ngOnInit(): void {
    const dataConfig = this.authService.getUserInfoConfig();
    if (dataConfig) this.userInfoConfig = { ...dataConfig };
    console.log(dataConfig);

    this.country = dataConfig.organisation.find(
      (c: OrganisationItem) => c.vcKey === 'Pays'
    )?.vcValue;
    console.log(this.country);

    this.phoneCode = dataConfig.organisation.find(
      (c: OrganisationItem) => c.vcKey === 'Telephone_Code'
    )?.vcValue;
    console.log(this.phoneCode);

    this.phoneFormat = dataConfig.organisation.find(
      (c: OrganisationItem) => c.vcKey === 'Telephone_Format'
    )?.vcValue;
    console.log(this.phoneFormat);

    if (this.phoneFormat) {
      // Premier chiffre
      this.firstNumberPhone = parseInt(this.phoneFormat.charAt(0), 10);

      // Nombre total de caractères (y compris le premier chiffre)
      this.phoneMaxLengthNumber = this.phoneFormat.length - 1;

      console.log('Premier chiffre :', this.firstNumberPhone);
      console.log('Nombre total de chiffres :', this.phoneMaxLengthNumber);
    }

    this.currency = dataConfig.organisation.find(
      (c: OrganisationItem) => c.vcKey === 'Devise'
    )?.vcValue;
    console.log(this.currency);

    const data = this.authService.getUserInfo();
    console.log(data);
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

    if (allowedKeys.includes(event.key)) {
      return; // autoriser touches de navigation/suppression
    }

    // Bloquer tout sauf chiffres
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

    // Optionnel : bloquer si déjà 9 chiffres saisis
    const input = event.target as HTMLInputElement;
    if (input.value.length >= this.phoneMaxLengthNumber) {
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
    if (input.value.length + pastedData.length > this.phoneMaxLengthNumber) {
      event.preventDefault();
    }
  }

  phoneErrorMessage: string = '';

  modifierInfos() {
    const phoneNumber = this.currentUserInfo.vcPhoneNumber;

    // Réinitialiser le message d'erreur
    this.phoneErrorMessage = '';

    // Premier chiffre du numéro saisi
    const firstNumberPhoneSaisi = parseInt(phoneNumber.charAt(0), 10);

    console.log('Numéro complet :', phoneNumber);
    console.log('Premier chiffre saisi :', firstNumberPhoneSaisi);
    console.log('firstNumberPhone :', this.firstNumberPhone);

    // Vérifier que le numéro de téléphone a le bon nombre de chiffres
    if (
      !phoneNumber ||
      phoneNumber.replace(/\D/g, '').length < this.phoneMaxLengthNumber
    ) {
      this.phoneErrorMessage = `Le numéro de téléphone doit contenir au moins ${this.phoneMaxLengthNumber} chiffres.`;
      return; // arrêter l'exécution si la condition n'est pas respectée
    }

    // Vérifier que le numéro commence par le bon chiffre
    if (firstNumberPhoneSaisi !== this.firstNumberPhone) {
      this.phoneErrorMessage = `Le numéro de téléphone doit commencer par ${this.firstNumberPhone}.`;
      return; // arrêter l'exécution si la condition n'est pas respectée
    }

    // Si tout est correct, on peut continuer l'appel API
    this.isLoading = true;
    this.authService
      .modifierProfile(
        this.currentUserInfo.vcLastname,
        this.currentUserInfo.vcFirstname,
        this.currentUserInfo.email,
        phoneNumber,
        Number(this.currentUserInfo.id)
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.status === 200) {
            this.toastr.success(response.message, '', {
              positionClass: 'toast-custom-center',
            });
            this.authService.setUserInfo(response.data);
          } else {
            this.toastr.error(response.message, '', {
              positionClass: 'toast-custom-center',
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error(error.message, '', {
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
