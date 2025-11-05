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

  country = '';
  phoneCode!: number;
  phoneFormat = '';
  currency = '';
  appVersion!: number;
  phoneMaxLength!: number;
  phoneFirstNumber!: string;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const data = this.authService.getUserInfo();
    console.log(data);
    if (data) this.currentUserInfo = { ...data };

    const config = this.authService.getUserConfigInfo();
    console.log(config);

    this.country = config.organisation.find(
      (c: any) => c.vcKey === 'Pays'
    )?.vcValue;

    this.phoneCode = config.organisation.find(
      (c: any) => c.vcKey === 'Telephone_Code'
    )?.vcValue;

    this.phoneFormat = config.organisation.find(
      (c: any) => c.vcKey === 'Telephone_Format'
    )?.vcValue;
    this.phoneMaxLength = this.phoneFormat.length - 1;

    this.currency = config.organisation.find(
      (c: any) => c.vcKey === 'Devise'
    )?.vcValue;

    this.appVersion = config.appVersion;
    this.phoneFirstNumber = this.phoneFormat.charAt(0);

    console.log('country : ', this.country);
    console.log('phoneCode : ', this.phoneCode);
    console.log('phoneFormat : ', this.phoneFormat);
    console.log('currency : ', this.currency);
    console.log('phoneMaxLength : ', this.phoneMaxLength);
    console.log('phoneFirstNumber : ', this.phoneFirstNumber);
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

    // ✅ Si phoneCode = 224, forcer que le premier chiffre soit 6
    // Si l'utilisateur essaie de taper le premier chiffre
    if (input.value.length === 0 && event.key !== this.phoneFirstNumber) {
      event.preventDefault();
      return;
    }

    if (input.value.length >= this.phoneMaxLength) {
      event.preventDefault();
    }
  }

  // Empêcher le collage de texte invalide
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';
    const input = event.target as HTMLInputElement;

    // Autoriser uniquement les chiffres et max 9 caractères
    if (!/^\d{1,9}$/.test(pastedData)) {
      event.preventDefault();
    }

    // ✅ Si phoneCode = 224, vérifier que le premier chiffre collé commence par 6
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

  // ✅ Modifier infos profil
  modifierInfos() {
    const phoneNumber = this.currentUserInfo.vcPhoneNumber;

    // Vérifier que le numéro de téléphone a au moins 9 chiffres
    if (
      !phoneNumber ||
      phoneNumber.replace(/\D/g, '').length < this.phoneMaxLength
    ) {
      this.toastr.error(
        `Le numéro de téléphone doit contenir au moins ${this.phoneMaxLength} chiffres.`,
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
        next: (res: any) => {
          this.isLoading = false;
          if (res.status === 200) {
            this.toastr.success(res?.message, '', {
              positionClass: 'toast-custom-center',
            });

            // Delete old value and update new user infos
            this.authService.setUpdateUserInfo(res?.data);
            console.log(res?.data);
          } else {
            this.toastr.error(res?.message, '', {
              positionClass: 'toast-custom-center',
            });
          }
        },

        error: (err) => {
          this.isLoading = false;
          this.toastr.error(err?.message, '', {
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
