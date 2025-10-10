import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../../services/modals/modals.service';

// Déclarer bootstrap pour TypeScript
declare var bootstrap: any;

@Component({
  selector: 'app-utilisteur',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './utilisteur.component.html',
  styleUrl: './utilisteur.component.css',
})
export class UtilisteurComponent implements OnInit {
  // Liste des utilisateurs
  utilisateurs = [
    {
      id: 1,
      nom: 'FELEMOU',
      prenom: 'Nyankoye Daniel',
      email: 'ndfelemou.dev@gmail.com',
      telephone: '620000000',
      role: 'Developer',
    },
    {
      id: 2,
      nom: 'Diallo',
      prenom: 'Mamadou',
      email: 'mamadou@mail.com',
      telephone: '620000002',
      role: 'Comptable',
    },
    {
      id: 3,
      nom: 'Bah',
      prenom: 'Aminata',
      email: 'aminata@mail.com',
      telephone: '620000003',
      role: 'Chef Comptable',
    },
    {
      id: 4,
      nom: 'Camara',
      prenom: 'Ibrahima',
      email: 'ibrahima@mail.com',
      telephone: '620000004',
      role: 'DAF',
    },
    {
      id: 5,
      nom: 'Sylla',
      prenom: 'Fatoumata',
      email: 'fatoumata@mail.com',
      telephone: '620000005',
      role: 'Comptable',
    },
    {
      id: 6,
      nom: 'Barry',
      prenom: 'Ousmane',
      email: 'ousmane@mail.com',
      telephone: '620000006',
      role: 'Chef Comptable',
    },
  ];

  userForm!: FormGroup;
  private subs = new Subscription();

  createUserModalId: string = 'createUserModal';
  updateUserModalId: string = 'updateUserModal';
  isLoading: boolean = false;

  // // userparams
  // newUser = {
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   telephone: '',
  //   selectedRole: '',
  //   description: '',
  // };

  // newOrganisation = {
  //   nomOrganisation: '',
  //   contact: '',
  //   addresse: '',
  //   city: '',
  //   country: '',
  // };

  roles = [
    { id: 1, name: 'developper', libelle: 'Developpeur', showExtra: true },
    { id: 2, name: 'user', libelle: 'Simple Utilisateur', showExtra: false },
    { id: 3, name: 'manager', libelle: 'Manager', showExtra: false },
    { id: 4, name: 'admin', libelle: 'Administrateur', showExtra: true },
    { id: 5, name: 'supervisor', libelle: 'Superviseur', showExtra: true },
  ];

  // contrôlera l'affichage de la section "business"
  showBusinessInfo = false;

  constructor(private modalsService: ModalsService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      vcFirstname: ['', Validators.required],
      vcLastname: ['', Validators.required],
      // ces deux contrôles sont uniques (racine)
      vcPhoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9+()\\-\\s]+$')],
      ],
      vcDescription: [''],
      vcEmail: ['', [Validators.required, Validators.email]],
      iRoleID: [null, Validators.required],
      vcPassword: ['', [Validators.required, Validators.minLength(6)]],

      // Organisation
      business: this.fb.group({
        vcName: [''],
        vcContact: [''],
        vcCity: [''],
        vcCountry: [''],
        vcAddress: [''],
        vcLogoPath: [''],
        vcBusinessEmailDomain: [''],
      }),
    });
  }

  ngOnInit(): void {
    // écouter les changements de rôle pour afficher / valider la section business
    const s = this.userForm
      .get('iRoleID')!
      .valueChanges.subscribe((roleId: any) => {
        const role = this.roles.find((r) => +r.id === +roleId);
        this.showBusinessInfo = !!role && !!role.showExtra;
        this.toggleBusinessValidators(this.showBusinessInfo);
      });
    this.subs.add(s);

    // Pour pre remplir le formualire
    // this.userForm.patchValue({
    //   vcFirstname: 'Daniel FELEMOU',
    //   vcEmail: 'daniel@example.com',
    //   iRoleID: 1,
    //   business: {
    //     vcName: 'Ma boîte',
    //     vcCity: 'Conakry',
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // Active/désactive validateurs pour les champs business
  private toggleBusinessValidators(enable: boolean) {
    const business = this.userForm.get('business') as FormGroup;
    if (!business) return;

    if (enable) {
      business.get('vcName')!.setValidators([Validators.required]);
      business.get('vcContact')!.setValidators([Validators.required]);
      business
        .get('vcBusinessEmailDomain')!
        .setValidators([Validators.required]);
    } else {
      // Enlever les validateurs (et vider les champs)
      Object.values(business.controls).forEach((ctrl) => {
        ctrl.clearValidators();
        // ctrl.setValue('');
        ctrl.updateValueAndValidity();
      });
    }
  }

  // Convenience getters
  get f() {
    return this.userForm.controls;
  }
  get b() {
    return (this.userForm.get('business') as FormGroup).controls;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.isLoading = true;
      this.userForm.markAllAsTouched();
      console.warn('Formulaire invalide, vérifie les champs.');
      return;
    }

    const raw = this.userForm.value;

    // Construire le payload final de façon garante d'avoir UNE SEULE email/phone :
    const payload: any = {
      vcFirstname: raw.vcFirstname,
      vcLastname: raw.vcLastname,
      vcPhoneNumber: raw.vcPhoneNumber, // source unique
      vcDescription: raw.vcDescription,
      vcEmail: raw.vcEmail, // source unique
      iRoleID: raw.iRoleID,
      vcPassword: raw.vcPassword,
    };

    // Si le rôle demande les champs business, on les ajoute — et on réutilise vcPhoneNumber/vcEmail
    if (this.showBusinessInfo) {
      payload.business = {
        ...raw.business,
        vcPhoneNumber: raw.vcPhoneNumber,
        vcEmail: raw.vcEmail,
      };
    }

    // Appel a l'API
    this.isLoading = false;

    // Sinon on peut ne pas envoyer la section business du tout
    // Envoi au serveur / service
    console.log('Formulaire valide, envoi du payload :', payload);
    console.log('Payload prêt à envoyer', payload);
    this.modalsService.closeAllModals();
    // this.myService.createUser(payload).subscribe(...);
  }

  openCreateUserModal(modalId: string = this.createUserModalId): void {
    const isCreateUserModalOpen = this.modalsService.isModalOpen(modalId);
    if (!isCreateUserModalOpen) {
      this.modalsService.openModal(modalId);
    }
    this.modalsService.closeModal(modalId);
  }

  // Permer de reset le formulaire
  resetForm(): void {
    this.userForm.reset();
    this.toggleBusinessValidators(false); // désactive validateurs business
    this.showBusinessInfo = false;
    this.modalsService.closeAllModals();
  }

  // @ViewChild('modalBody') modalBody!: ElementRef<HTMLDivElement>;
  // private hasFocusedModalBody = false;

  // showModalAjoutUtilisateur: boolean = false;

  // newUser = {
  //   nom: '',
  //   prenom: '',
  //   email: '',
  //   telephone: '',
  //   role: ''
  // };

  // roles = ['Developer', 'Comptable', 'Chef Comptable', 'DAF'];

  // // Pagination
  // pageSizeOptions = [5, 10, 25, 50];
  // pageSize: number = 5;
  // currentPage: number = 1;

  // // On expose Math pour l'utiliser dans le template
  // Math = Math;

  // get totalPages(): number {
  //   return Math.ceil(this.utilisateurs.length / this.pageSize);
  // }

  // get utilisateursPagines() {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   return this.utilisateurs.slice(startIndex, startIndex + this.pageSize);
  // }

  // changerPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //   }
  // }

  // onPageSizeChange(event: Event) {
  //   const select = event.target as HTMLSelectElement;
  //   const newSize = parseInt(select.value, 10);
  //   if (!isNaN(newSize) && newSize > 0) {
  //     this.pageSize = newSize;
  //     this.currentPage = 1;
  //   }
  // }

  // // Modal & scroll logic
  // ngAfterViewChecked() {
  //   if (this.showModalAjoutUtilisateur && this.modalBody && !this.hasFocusedModalBody) {
  //     this.modalBody.nativeElement.focus();
  //     this.hasFocusedModalBody = true;
  //   }
  // }

  // onModalBodyKeydown(event: KeyboardEvent) {
  //   const element = this.modalBody.nativeElement;
  //   const scrollStep = 40;

  //   switch (event.key) {
  //     case 'ArrowDown':
  //       element.scrollBy({ top: scrollStep, behavior: 'smooth' });
  //       event.preventDefault();
  //       break;
  //     case 'ArrowUp':
  //       element.scrollBy({ top: -scrollStep, behavior: 'smooth' });
  //       event.preventDefault();
  //       break;
  //     case 'PageDown':
  //       element.scrollBy({ top: element.clientHeight, behavior: 'smooth' });
  //       event.preventDefault();
  //       break;
  //     case 'PageUp':
  //       element.scrollBy({ top: -element.clientHeight, behavior: 'smooth' });
  //       event.preventDefault();
  //       break;
  //     case 'Home':
  //       element.scrollTo({ top: 0, behavior: 'smooth' });
  //       event.preventDefault();
  //       break;
  //     case 'End':
  //       element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  //       event.preventDefault();
  //       break;
  //   }
  // }

  // openModalAjout() {
  //   this.showModalAjoutUtilisateur = true;
  //   this.hasFocusedModalBody = false;
  //   this.resetNewUser();
  // }

  // closeModalAjout() {
  //   this.showModalAjoutUtilisateur = false;
  // }

  // resetNewUser() {
  //   this.newUser = { nom: '', prenom: '', email: '', telephone: '', role: '' };
  // }

  // addUtilisateur(form: NgForm) {
  //   if (form.valid) {
  //     const newId = this.utilisateurs.length + 1;
  //     this.utilisateurs.push({ id: newId, ...this.newUser });
  //     this.closeModalAjout();

  //     // ajuster si on est à la dernière page
  //     if (this.currentPage < this.totalPages) {
  //       // rien
  //     } else {
  //       this.currentPage = this.totalPages;
  //     }
  //   }
  // }
}
