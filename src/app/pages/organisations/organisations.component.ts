import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './organisations.component.html',
  styleUrl: './organisations.component.css',
})
export class OrganisationsComponent implements OnInit {
  // Liste des organisations
  orgForm!: FormGroup;
  isLoading: boolean = false;
  isLoadingOrgs: boolean = false;

  roles: any[] = [];
  filteredRole: any = {};
  organisations: any[] = [];
  currentUser: any;

  createOrgModalId: string = 'createOrgModal';
  lienSite: string = environment.lienSite;

  // Gestion de la pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  pagedOrganisations: any[] = [];

  selectedOrg: any = null;
  selectedOrgId: number | null = null;

  constructor(
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private orgService: OrganisationsService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
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

    this.initForm();

    // Chargement des donnees
    this.loadRoles();
    this.loadOrganisations();
  }

  // Initialiser le formulaire
  initForm() {
    this.orgForm = this.fb.group({
      vcOrgName: ['', Validators.required],
      vcOrgContact: ['', Validators.required],
      vcOrgPhoneNumber: ['', Validators.required],
      vcOrgEmail: ['', [Validators.required, Validators.email]],
      vcOrgCity: ['', Validators.required],
      vcOrgCountry: ['', Validators.required],
      vcOrgAddress: ['', Validators.required],
      vcOrgLogoPath: ['', Validators.required],
      vcBusinessEmailDomain: ['', [Validators.required, Validators.email]],

      // Pour les infos utilisateurs
      vcFirstname: ['', Validators.required],
      vcLastname: ['', Validators.required],
      vcDescription: ['', Validators.required],
      iRoleID: ['', Validators.required],
    });
  }

  openCreateModal() {
    this.orgForm.reset(); // Vider le formulaire
    this.modalsService.openModal('createOrgModal');
  }

  closeModal(modalId: string) {
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
      lienSite: this.lienSite,
    };

    // appel a l'API de creation d'une organisation
    this.orgService.createOrganisation(dataToSend).subscribe({
      next: (res) => {
        console.log('Parametres envoyees : ', dataToSend);

        if (res?.status && res?.status === 200) {
          this.toastr.success(res.message, '', {
            positionClass: 'toast-custom-center',
          });

          console.log('✅ Organisation créée :', res);
          this.loadOrganisations();

          this.orgForm.reset();
          this.modalsService.closeAllModals();
        } else {
          this.toastr.error(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        this.isLoading = false;
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

  onEdit(org: any) {
    this.modalsService.openModal('updateOrgModal');
    this.selectedOrg = org;
    console.log('selected org : ', this.selectedOrg);

    //
    this.orgForm.patchValue({
      // Org infos
      vcOrgName: this.selectedOrg.organisationName,
      vcOrgContact: this.selectedOrg.vcContact,
      vcOrgPhoneNumber: this.selectedOrg.vcPhoneNumber,
      vcOrgEmail: this.selectedOrg.vcEmail,
      vcOrgCity: this.selectedOrg.vcCity,
      vcOrgCountry: this.selectedOrg.vcCountry,
      vcOrgAddress: this.selectedOrg.vcAddress,
      vcOrgLogoPath: '',
      vcBusinessEmailDomain: this.selectedOrg.vcBusinessEmailDomain,

      // Pour les infos utilisateurs
      vcFirstname: this.selectedOrg.vcFirstnameUsers,
      vcLastname: this.selectedOrg.vcLastnameUsers,
      vcDescription: this.selectedOrg.vcDescription,
      iRoleID: this.selectedOrg.iRoleID,
    });

    this.cd.detectChanges();
  }

  onUpdate() {
    if (this.orgForm.invalid) {
      this.orgForm.markAllAsTouched();
      console.log('invalid forms');
      return;
    }

    console.log(this.orgForm.value);

    this.modalsService.closeAllModals();
  }

  // Fonction priver pour Recharger automatiquement la liste des organisations
  private loadOrganisations() {
    this.isLoadingOrgs = true;
    this.orgService.getOrganisations().subscribe({
      next: (res) => {
        this.organisations = res.data;
        this.isLoadingOrgs = false;
        this.currentPage = 1;
        this.updatePagination();
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
        if (res?.status && res?.status === 200) {
          this.roles = res.data;
          this.filteredRole = this.roles.find((role) => role.id === '7');

          console.log('liste roles : ', this.roles);
          console.log('filteredRole : ', this.filteredRole);
        } else {
          console.log('Erreur chargement des rôles : ', res);
          this.toastr.error(res?.message);
        }
        this.isLoading = false;
      },

      error: (err) => {
        console.error('Erreur chargement des rôles :', err.message);
        this.isLoading = false;
      },
    });
  }

  // méthode pour calculer la page courante
  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.pagedOrganisations = this.organisations.slice(start, end);
    this.totalPages = Math.ceil(this.organisations.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  // Mes getters
  get startRecord(): number {
    if (this.organisations.length === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endRecord(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.organisations.length ? this.organisations.length : end;
  }

  get totalRecords(): number {
    return this.organisations.length;
  }
}
