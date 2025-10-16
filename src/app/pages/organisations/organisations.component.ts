import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../../services/authService/auth.service';
import { ModalsService } from '../../services/modals/modals.service';
import { OrganisationsService } from '../../services/organisations/organisations.service';
import { RolesService } from '../../services/roles/roles.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../utils/form-helpers';

@Component({
  selector: 'app-organisations',
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './organisations.component.html',
  styleUrl: './organisations.component.css',
})
export class OrganisationsComponent implements OnInit {
  // Liste des organisations
  orgForm!: FormGroup;
  isLoading: boolean = false;
  isLoadingOrgs: boolean = false;

  roles: any[] = [];
  organisations: any[] = [];
  currentUser: any;

  createOrgModalId: string = 'createOrgModal';
  siteUrl: string = environment.siteUrl;

  constructor(
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private orgService: OrganisationsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.orgForm, name);
  isValid = (name: string) => isValid(this.orgForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.orgForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.orgForm, name);

  ngOnInit(): void {
    this.modalsService.closeAllModals();

    // const userData = localStorage.getItem('userInfo');
    const userData = this.authService.getUserInfo();
    if (userData) {
      // this.currentUser = JSON.parse(userData);
      this.currentUser = userData;
    }

    // Initialiser le formulaire
    this.orgForm = this.fb.group({
      vcOrgName: ['MON ORGRANISATION 1', Validators.required],
      vcOrgContact: ['LE DIRECTEUR', Validators.required],
      vcOrgPhoneNumber: ['663230744', Validators.required],
      vcOrgEmail: [
        'soyopeg715@datoinf.com',
        [Validators.required, Validators.email],
      ],
      vcOrgCity: ['MAMOU', Validators.required],
      vcOrgCountry: ['GUINEE', Validators.required],
      vcOrgAddress: ['HORE FELLO', Validators.required],
      vcOrgLogoPath: ['', Validators.required],
      vcBusinessEmailDomain: ['soyopeg715@datoinf.com', Validators.required],

      // Pour les infos utilisateurs
      vcFirstname: ['Daniel', Validators.required],
      vcLastname: ['FELEMOU', Validators.required],
      vcDescription: ["Une description qui n'est pas trop grande !"],
      iRoleID: [''],
    });

    // Charger les rôles depuis l'API
    this.rolesService.getAllRoles().subscribe({
      next: (res) => {
        const allRoles = res.data;

        // Filtrer selon le rôle de l'utilisateur connecté
        this.roles =
          this.currentUser?.iRoleID === 10
            ? allRoles
            : allRoles.filter((r: any) => r.id === this.currentUser.iRoleID);
        this.isLoading = false;
      },

      error: (err) => {
        console.error('Erreur chargement des rôles :', err.message);
        this.isLoading = false;
      },
    });

    // Chargement des organisations
    this.loadOrganisations();
  }

  // Ouvrir le formulaire de creation
  openCreateOrgModal(modalId: string = this.createOrgModalId): void {
    const isCreateOrgModalOpen = this.modalsService.isModalOpen(modalId);
    if (!isCreateOrgModalOpen) {
      this.modalsService.openModal(modalId);
    }
    this.modalsService.closeModal(modalId);
  }

  // a la soumission du formulaire
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
      lienSite: environment.siteUrl,
    };

    // appel a l'API de creation d'une organisation
    this.orgService.createOrganisation(dataToSend).subscribe({
      next: (res) => {
        console.log('Parametres envoyees : ', dataToSend);
        // Recharger automatiquement la liste
        this.loadOrganisations();

        console.log('✅ Organisation créée :', res);
        this.isLoading = false;
        this.orgForm.reset();
        this.modalsService.closeAllModals();

        this.toastr.success(res.message, '', {
          positionClass: 'toast-custom-center',
        });
      },

      error: (err) => {
        console.error('❌ Erreur lors de la création :', err);
        this.isLoading = false;

        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });
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
      },
      error: (err) => {
        console.error('Erreur chargement organisations', err);
        this.isLoadingOrgs = false;
      },
    });
  }

  // Méthode pour remplir rapidement le formulaire avec les données de test
  fillTestForm() {
    this.orgForm.patchValue({
      vcOrgName: 'Test Organisation',
      vcOrgContact: 'Daniel FELEMOU',
      vcOrgPhoneNumber: '+224663230744',
      vcOrgEmail: 'test@organisation.com',
      vcOrgCity: 'Conakry',
      vcOrgCountry: 'Guinée',
      vcOrgAddress: 'Quartier Test',
      vcOrgLogoPath: 'logo.png',
      vcBusinessEmailDomain: 'organisation.com',
      vcFirstname: 'Daniel',
      vcLastname: 'FELEMOU',
      vcDescription: 'Description test',
      vcUserEmail: 'daniel@test.com',
      iRoleID: this.currentUser?.iRoleID || '',
    });
  }
}
