import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/authService/auth.service';
import { ConfigurationsService } from '../../../services/configurations/configurations.service';
import { OrganisationsService } from '../../../services/organisations/organisations.service';

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

  countries: any[] = [];
  isLoadingCoutries: boolean = false;

  userInfoConfig: any;
  country: string = '';
  phoneCode: number = 0;
  phoneFormat: string = '';
  currency: string = '';
  timeZone: string = '';
  timeZonePerUser: any = '';

  phoneMaxLength!: number;
  phoneFirstNumber!: string;

  orgForm!: FormGroup;
  orgId!: number;
  configs!: any;

  isChecked = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private orgService: OrganisationsService,
    private fb: FormBuilder,
    private configService: ConfigurationsService
  ) {}

  ngOnInit(): void {
    const dataConfig = this.authService.getUserInfoConfig();
    const userInfo = this.authService.getUserInfo();
    this.orgId = userInfo.iOrganisationID;

    console.log('dataConfig : ', dataConfig);
    console.log('userInfo : ', userInfo);

    if (dataConfig) {
      this.userInfoConfig = { ...dataConfig };
      console.log('userInfoConfig : ', this.userInfoConfig);

      this.country = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'Pays'
      )?.vcValue;
      console.log(this.country);

      this.phoneCode = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'Telephone_Code'
      )?.vcValue;

      this.phoneFormat = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'Telephone_Format'
      )?.vcValue;
      this.phoneMaxLength = this.phoneFormat.length;

      this.currency = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'Devise'
      )?.vcValue;

      this.timeZone = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'TimeZone'
      )?.vcValue;

      this.timeZonePerUser = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'TimeZonePerUser'
      )?.vcValue;
      console.log('TimeZonePerUser : ', this.timeZonePerUser);

      this.phoneFirstNumber = this.phoneFormat.charAt(0);

      console.log('country : ', this.country);
      console.log('phoneCode : ', this.phoneCode);
      console.log('phoneFormat : ', this.phoneFormat);
      console.log('currency : ', this.currency);
      console.log('phoneMaxLength : ', this.phoneMaxLength);
      console.log('phoneFirstNumber : ', this.phoneFirstNumber);
    }

    if (
      this.timeZonePerUser === 1 ||
      this.timeZonePerUser === '1' ||
      this.timeZonePerUser === true
    ) {
      this.isChecked = true;
    }

    // Chargement de l'utilisateur connecté
    const data = this.authService.getUserInfo();
    if (data) this.currentUserInfo = { ...data };

    // Initialisation du formulaire
    this.initForm();

    // Chargement de la liste des pays
    this.loadListePays();

    // 🔄 Mettre à jour les champs auto quand le pays change
    this.orgForm.get('Pays')?.valueChanges.subscribe((selectedCountryCode) => {
      console.log('entre sle : ', selectedCountryCode);
      if (!selectedCountryCode) return;

      const selected = this.countries.find(
        (c: any) =>
          c.vcCode.toLowerCase().trim() ==
          selectedCountryCode.toLowerCase().trim()
      );
      console.log('selected country : ', selected);

      if (selected) {
        this.orgForm.patchValue(
          {
            Telephone_Code: selected.vcPhoneCode,
            Telephone_Format: selected.vcPhoneFormat,
            TimeZone: selected.vcTimeZone,
            Devise: selected.devise || this.currency, // si ton API renvoie une devise
            TimeZonePerUser: this.timeZonePerUser === 1 ? true : false,
          },
          { emitEvent: false } // 🛑 évite la boucle infinie
        );
      }
    });
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

  modifierInfos() {
    // Si tout est correct, on peut continuer l'appel API
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

  // Initialisation du formulaire
  private initForm(): void {
    this.orgForm = this.fb.group({
      Pays: [this.country || '', Validators.required],
      Telephone_Code: [this.phoneCode || '', Validators.required],
      Telephone_Format: [this.phoneFormat || '', Validators.required],
      TimeZone: [this.timeZone || '', Validators.required],
      Devise: [this.currency || '', Validators.required],
      TimeZonePerUser: [this.isChecked ? true : false],
    });
  }

  // Liste des pays.
  private loadListePays(): void {
    this.isLoadingCoutries = true;
    this.orgService.getListePays().subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.countries = res?.data;
          console.log(this.countries);

          // ✅ Sélectionner le pays de l'utilisateur connecté (après chargement)
          const selectedCountry = this.countries.find(
            (c: any) =>
              c.vcName.toLowerCase().trim() ===
                this.country?.toLowerCase().trim() ||
              c.vcCode.toLowerCase().trim() ===
                this.country?.toLowerCase().trim()
          );

          if (selectedCountry) {
            this.orgForm.patchValue(
              {
                Pays: selectedCountry.vcCode,
                Telephone_Code: selectedCountry.vcPhoneCode,
                Telephone_Format: selectedCountry.vcPhoneFormat,
                TimeZone: selectedCountry.vcTimeZone,
                Devise: selectedCountry.vcCurrency || this.currency,
              },
              { emitEvent: false } // évite boucle
            );
          }
        } else {
          this.toastr.error(res?.message || 'Erreur de chargement', '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log(res);
        this.isLoadingCoutries = false;
      },

      error: (err) => {
        this.toastr.error(
          err?.message || 'Erreur lors du chargement des pays',
          '',
          {
            positionClass: 'toast-custom-center',
          }
        );
        console.log(err);
        this.isLoadingCoutries = false;
      },
    });
  }

  // Changer les informations de configuration du pays
  onSubmit(): void {
    if (this.orgForm.invalid) return;
    const formValue = this.orgForm.value;

    console.log('formValue', formValue);

    const payload = Object.keys(formValue).map((key) => ({
      vcKey: key,
      vcValue:
        key === 'TimeZonePerUser'
          ? formValue[key]
            ? '1'
            : '0'
          : formValue[key],
    }));

    // (formValue[key] ? 1 : 0)

    console.log('✅ Données à envoyer au backend :', payload);

    this.isLoading = true;

    // Appel au service de mise ajour.
    this.configService.updateMultipleConfigs(this.orgId, payload).subscribe({
      next: (res) => {
        console.log('doneer envoyer sont : ', this.orgId, payload);

        if (res?.status && res?.status === 200) {
          this.toastr.success(res.message, '', {
            positionClass: 'toast-custom-center',
          });

          const oldConf = this.authService.getUserInfoConfig();
          console.log('dany', oldConf, { ...oldConf, organisation: res?.data });
          this.authService.setUserInfoConfig({
            ...oldConf,
            organisation: res?.data,
          });
        } else {
          this.toastr.error(res.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log(res);
        console.log(this.timeZonePerUser);
        this.isLoading = false;
      },

      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });
        this.isLoading = false;
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
