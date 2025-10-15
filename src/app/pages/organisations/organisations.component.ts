import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  organisations: any[] = [];
  roles: any[] = [];

  orgForm!: FormGroup;
  createOrgModalId: string = 'createOrgModal';
  isLoading: boolean = true;

  constructor(
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private organisationsService: OrganisationsService
  ) {
    this.orgForm = this.fb.group({
      vcOrgName: ['', Validators.required],
      vcOrgContact: ['', Validators.required],
      vcOrgPhoneNumber: ['', Validators.required],
      vcOrgEmail: ['', [Validators.required, Validators.email]],
      vcOrgCity: ['', Validators.required],
      vcOrgCountry: ['', Validators.required],
      vcOrgAddress: ['', Validators.required],
      vcOrgLogoPath: ['', Validators.required],
      vcBusinessEmailDomain: ['', Validators.required],

      // Pour les infos utilisateurs
      vcFirstname: ['', Validators.required],
      vcLastname: ['', Validators.required],
      vcDescription: ['', Validators.required],
      iRoleID: [null, Validators.required],
    });
  }

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.orgForm, name);
  isValid = (name: string) => isValid(this.orgForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.orgForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.orgForm, name);

  ngOnInit(): void {
    this.modalsService.closeAllModals();

    this.rolesService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Erreur : ', err.message);
        this.isLoading = false;
      },
    });

    this.isLoading = false;

    // Chargement des organisations
    this.organisationsService.getOrganisations().subscribe({
      next: (res) => {
        this.organisations = res.data;
        this.isLoading = false;
      },

      error: (err) => {
        console.log('Erreur chargement organisation : ', err.message);
        this.isLoading = false;
      },
    });

    this.isLoading = false;
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
    if (this.orgForm.valid) {
      console.log('✅ Formulaire valide !');
      console.log('Valeurs du formulaire :', this.orgForm.value);
    } else {
      console.log('❌ Formulaire invalide');
      this.orgForm.markAllAsTouched();
    }
  }
}
