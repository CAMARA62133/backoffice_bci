import { CommonModule, NgClass, NgIf } from '@angular/common';
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
import { ToastrService } from 'ngx-toastr';
import { AlerteType, ToggleAlerteParams } from '../../interfaces/alertes';
import { AlertesService } from '../../services/alertes/alertes.service';
import { ModalsService } from '../../services/modals/modals.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../utils/form-helpers';

@Component({
  selector: 'app-alertes',
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './alertes.component.html',
  styleUrl: './alertes.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertesComponent implements OnInit {
  isLoadingAlerte: boolean = false;
  isLoadingGroupes: boolean = false;
  isLoadingModules: boolean = false;
  isLoadingNiveaux: boolean = false;
  isLoading: boolean = false;

  alertForm!: FormGroup;
  createAlertModal: string = 'createAlertModal';

  selectedAlert: any = null;

  alertes: any[] = [];
  groupes: any[] = [];
  modules: any[] = [];
  niveauxUrgence: any[] = [];
  typeAlertes: AlerteType[] = [
    { id: 'URGENT', description: 'URGENT' },
    { id: 'INFO', description: 'INFO' },
  ];

  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalsService: ModalsService,
    private toastr: ToastrService,
    private alertService: AlertesService,
    private cd: ChangeDetectorRef
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.alertForm, name);
  isValid = (name: string) => isValid(this.alertForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.alertForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.alertForm, name);

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

    const dataToSend = { ...this.alertForm.value };
    console.log('Data to send : ', dataToSend);

    this.alertService.createAlerte(dataToSend).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          console.log('Parametres envoyees : ', dataToSend);

          this.loadAlertes();
          console.log('✅ Alertes créée :', res);
          this.isLoading = false;
          this.alertForm.reset();
          this.modalsService.closeAllModals();
          this.toastr.success(res?.message || 'Alerte créée avec succès !');
        } else {
          console.log('Erreur : ', res);

          this.isLoading = false;
          this.toastr.error(
            res?.message || "Erreur lors de la création de l'alerte"
          );
        }
      },

      error: (err) => {
        this.toastr.error(
          err?.message || "Erreur lors de la creation de l'alerte"
        );
        console.log('Erreur create alerte : ', err);
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Au lancement du formulaire d'edition
  onEdit(alert: any) {
    this.openModal('updateAlertModal');
    this.selectedAlert = { ...alert };
    console.log('selected alerte : ', this.selectedAlert);

    this.alertForm.patchValue({
      message: alert.messageAlerte,
      idNiveauUrgence: alert.idNiveauDurgence,
      typeAlerte: alert.typeAlert,
      groupeConcerne: alert.groupeConcerne,
      description: alert.vcDescription,
      limiteDeclenchement: alert.limiteDeclenchementAlerte,
      idModule: alert.idModule,
      idAlerte: alert.id,
    });

    this.cd.detectChanges();
  }

  // A la soumission du formulaire de modification d'alerte
  onUpdate(): void {
    if (this.alertForm.invalid) {
      this.alertForm.markAllAsTouched();
      console.log('Formulaire invalide !');
      return;
    }

    this.isLoading = true;

    // On récupère les données du formulaire
    const formData = this.alertForm.value;

    // On construit l’objet à envoyer
    const dataToSend = {
      message: formData.message,
      idNiveauDurgence: formData.idNiveauUrgence,
      typeAlerte: formData.typeAlerte,
      groupeConcerne: formData.groupeConcerne,
      description: formData.description,
      limiteDeclenchementAlerte: formData.limiteDeclenchement,
      idModule: formData.idModule,
      idAlerte: this.selectedAlert?.id,
    };

    /**
     *
     */

    console.log('🟢 Données envoyées :', dataToSend);

    // Appel a l'api de modification
    this.alertService.uppdateAlerte(dataToSend).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          console.log('Modification effectuer avec success : ', res?.message);
          this.toastr.success(res?.message);
        } else {
          console.log('Erreur lors de la modification : ', res?.message);
          this.toastr.error(res?.message);
        }
      },

      error: (err) => {
        console.log('Erreur : ', err);
        this.toastr.error(err?.message);
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Bloquer ou Debloquer une alerte
   * @param alert : l'alerte a bloquer ou debloquer
   */
  onToggle(alert: any): void {
    this.isLoading = true;

    const isActive = +alert.statusAlert === 1;
    const btEnableAlert = isActive ? 0 : 1;
    const params: ToggleAlerteParams = { idAlert: alert.id, btEnableAlert };
    const message = isActive
      ? 'Alerte bloqué avec succès !'
      : 'Alerte débloqué avec succès !';

    console.log(`${isActive ? 'Bloquage' : 'Debloquage'}: `, { alert });
    console.log('params : ', params);

    // Appel au service
    this.alertService.toggleAlerte(params).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          console.log(message, { res });
          this.toastr.success(message);
          this.loadAlertes();
        } else {
          console.log(' Erreur : ', { res });
          this.toastr.error(res.message);
          this.loadAlertes();
        }
      },

      error: (err) => {
        this.toastr.error(err.message);
        console.log(message, { err });
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /** Fonction priver pour recharger automatiquement la liste des alertes a chaque fois qu'il y a un changement */
  private loadAlertes(): void {
    this.isLoadingAlerte = true;
    this.alertService.getListeAlertesConfig().subscribe({
      next: (res) => {
        this.alertes = res.data;
        console.log('Alertes liste : ', this.alertes);
      },

      error: (err) => {
        console.error('Erreur chargement alertes : ', err);
      },

      complete: () => {
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
