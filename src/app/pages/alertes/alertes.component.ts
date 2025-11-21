import {CommonModule, NgClass, NgIf} from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AlerteType} from '../../interfaces/alertes';
import {AlertesService} from '../../services/alertes/alertes.service';
import {ModalsService} from '../../services/modals/modals.service';
import {PaginationsService} from '../../services/paginations/paginations.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../utils/form-helpers';
import {DataTableDirective} from '../../directives/data-table/data-table.directive';


@Component({
  selector: 'app-alertes',
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf, DataTableDirective],
  templateUrl: './alertes.component.html',
  styleUrl: './alertes.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertesComponent implements OnInit {
  // Declaration des variables
  isLoadingAlerte: boolean = false;
  isLoadingGroupes: boolean = false;
  isLoadingModules: boolean = false;
  isLoadingNiveaux: boolean = false;
  isLoading: boolean = false;

  alertForm!: FormGroup;
  createAlertModal: string = 'createAlertModal';

  selectedAlert: any = null;

  alertes: any[] = [];
  paginatedAlertes: any[] = [];

  groupes: any[] = [];
  modules: any[] = [];
  niveauxUrgence: any[] = [];
  typeAlertes: AlerteType[] = [
    {id: 'URGENT', description: 'URGENT'},
    {id: 'INFO', description: 'INFO'},
  ];

  isEditing: boolean = false;
  idAlerte: number = 0;

  selectedAlerteId: number | null = null;
  btEnabled: boolean = false;
  showModalOpenBloquerDebloquer = false;
  errorMessage: string = '';
  isloadingBloquerDebloquer: boolean = false;

  // Constructeur
  constructor(
    private fb: FormBuilder,
    private modalsService: ModalsService,
    private toastr: ToastrService,
    private alertService: AlertesService,
    private cd: ChangeDetectorRef,

  ) {
  }

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.alertForm, name);
  isValid = (name: string) => isValid(this.alertForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.alertForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.alertForm, name);

  /**
   * A l'initialisation du composant on :
   * 1. Ferme tout les modals
   * 2. Initialise le formulaire de façon reactive et rendre les champs obligatoire
   * 3. On charge les donnnees (alertes, groupes concernes, modules, niveaux d'urgence)
   */
  ngOnInit(): void {
    this.modalsService.closeAllModals();

    // Initialiser le formulaire
    this.alertForm = this.fb.group({
      message: ['', Validators.required],
      idNiveauUrgence: ['', Validators.required],
      typeAlerte: ['', Validators.required],
      groupeConcerne: ['', Validators.required],
      description: ['', Validators.required],
      limiteDeclenchement: ['', Validators.required],
      idModule: ['', Validators.required],
    });

    // Chargement des donnees
    this.loadAlertes();
    this.loadGroupes();
    this.loadModules();
    this.loadNiveauxUrgence();
  }

  // Ouverture de modal
  openModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);

    if (!this.isEditing) {
      this.alertForm.reset();
    }

    if (!isModalOpen) {
      this.modalsService.openModal(modalId);
      this.alertForm.reset();
    }
    this.modalsService.closeModal(modalId);
    this.modalsService.closeAllModals();
  }

  // A la soumission du formulaire de creation d'alerte
  onSubmit(): void {
    if (this.alertForm.invalid) {
      this.alertForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const dataToSend = {...this.alertForm.value};
    console.log('Data to send : ', dataToSend);

    this.alertService.createAlerte(dataToSend).subscribe({
      next: (res) => {
        this.loadAlertes();
        console.log('✅ Alertes créée :', res);
        this.isLoading = false;
        this.alertForm.reset();
        this.modalsService.closeAllModals();
        this.toastr.success('Alerte créée avec succès !');

        this.loadAlertes();

      },

      error: (err) => {
        this.toastr.error("Erreur lors de la creation de l'alerte");
        console.log('Erreur create alerte : ', err);
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Au lancement du formulaire d'edition
   * On ouvre le formulaire d'edition avec les bonnes informations
   * @param alert sera l'alerte courrante
   */
  onEdit(alert: any) {
    this.openModal('updateAlertModal');
    this.selectedAlert = {...alert};
    this.idAlerte = this.selectedAlert.id;
    console.log('selected alerte : ', this.selectedAlert);

    this.alertForm.patchValue({
      message: alert.messageAlerte,
      idNiveauUrgence: alert.idNiveauDurgence,
      typeAlerte: alert.typeAlert,
      groupeConcerne: alert.groupeConcerne,
      description: alert.vcDescription,
      limiteDeclenchement: alert.limiteDeclenchementAlerte,
      idModule: alert.idModule,
    });

    this.cd.detectChanges();
  }

  // A la soumission du formulaire de modification d'alerte
  onUpdate(): void {
    if (this.alertForm.invalid) {
      this.alertForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // On récupère les données du formulaire
    const formData = {...this.alertForm.value, idAlert: this.idAlerte};

    console.log('form data : ', formData);

    // On construit l’objet à envoyer
    const dataToSend = {
      message: formData.message,
      idNiveauUrgence: formData.idNiveauUrgence,
      typeAlerte: formData.typeAlerte,
      groupeConcerne: formData.groupeConcerne,
      description: formData.description,
      limiteDeclenchement: formData.limiteDeclenchement,
      idModule: formData.idModule,
      idAlerte: this.idAlerte,
    };

    console.log('🟢 Données envoyées :', dataToSend);

    /**
     *  Appel au service de modification
     */
    this.alertService.uppdateAlerte(dataToSend).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          console.log('Modification effectuer avec success : ', res?.message);
          this.toastr.success(res?.message);

          this.loadAlertes();

        } else {
          console.log('Erreur lors de la modification : ', res?.message);
          this.toastr.error(res?.message);
        }
      },

      error: (err) => {
        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });

        console.log('Erreur : ', err);
      },

      complete: () => {
        this.isLoading = false;
        this.modalsService.closeModal('updateAlertModal');
        this.modalsService.closeAllModals();
        this.loadAlertes();
      },
    });
  }

  // A l'affichage du formulaire de validation
  onToggle(alerte: any) {
    this.openModal('bloquerDebloquerModal');
    this.selectedAlerteId = alerte.id;
    this.btEnabled = alerte.statusAlert === '0';
    console.log('Selected alerte : ', alerte);
  }

  // Au changement d'etat (Blocage et deblocage)
  bloquerEtDebloquer(): void {
    if (this.isloadingBloquerDebloquer) return;
    if (this.selectedAlerteId === null) {
      this.toastr.error('Aucune alerte sélectionnée.');
      return;
    }

    this.isloadingBloquerDebloquer = true;

    const params = {
      idAlert: this.selectedAlerteId,
      btEnableAlert: this.btEnabled,
    };

    this.alertService.toggleAlerte(params).subscribe({
      next: (res) => {
        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });
        this.loadAlertes();


        this.showModalOpenBloquerDebloquer = false;
        this.isloadingBloquerDebloquer = false;
        this.modalsService.closeModal('bloquerDebloquerModal');
        console.log('toggle alertes : ', res);
      },

      error: (err) => {
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err toggle alertes : ', err);
        this.isloadingBloquerDebloquer = false;
        this.modalsService.closeModal('bloquerDebloquerModal');
      },
    });
  }

  /** Fonction priver pour recharger automatiquement la liste des alertes a chaque fois qu'il y a un changement */
  private loadAlertes(): void {
    this.isLoadingAlerte = true;

    this.alertService.getListeAlertesConfig().subscribe({
      next: (res) => {
        this.alertes = res.data || [];

        console.log('Alertes liste : ', this.alertes);
        this.isLoadingAlerte = false;


      },

      error: (err) => {
        console.error('Erreur chargement alertes : ', err);
        this.isLoadingAlerte = false;
      },
    });
  }

  /** Chargement des groupes */
  private loadGroupes(): void {
    this.isLoadingGroupes = true;
    this.alertService.getListeGroupeConcerner().subscribe({
      next: (res) => {
        this.groupes = res.data;
        console.log('Groupes liste : ', this.groupes);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des groupes', err);
      },
      complete: () => {
        this.isLoadingGroupes = false;
      },
    });
  }

  /** Chargement des modules */
  private loadModules(): void {
    this.isLoadingModules = true;
    this.alertService.getListeModules().subscribe({
      next: (res) => {
        this.modules = res.data;
        console.log('Liste modules : ', this.modules);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des modules', err);
      },
      complete: () => {
        this.isLoadingModules = false;
      },
    });
  }

  /** Chargement des niveaux d'urgence */
  private loadNiveauxUrgence(): void {
    this.isLoadingNiveaux = true;
    this.alertService.getListeNiveauUrgence().subscribe({
      next: (res) => {
        this.niveauxUrgence = res.data;
        console.log('Liste niveau urgence : ', this.niveauxUrgence);
      },

      error: (err) => {
        console.error('Erreur lors du chargement des niveaux d’urgence', err);
      },

      complete: () => {
        this.isLoadingNiveaux = false;
      },
    });
  }
}
