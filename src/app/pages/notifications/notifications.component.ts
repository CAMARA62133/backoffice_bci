import {NgClass, NgFor, NgIf} from '@angular/common';
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
import {NotificationsService} from '../../services/notifications/notifications.service';
import {PaginationsService} from '../../services/paginations/paginations.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../utils/form-helpers';

@Component({
  selector: 'app-notifications',
  imports: [ReactiveFormsModule, NgIf, NgClass, NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationsComponent implements OnInit {
  isLoadingNotif: boolean = false;
  isLoadingGroupes: boolean = false;
  isLoadingModules: boolean = false;
  isLoadingNiveaux: boolean = false;
  isLoading: boolean = false;

  notifForm!: FormGroup;
  createNotificationModal: string = 'createNotifModal';
  updateNotificationModal: string = 'updateNotifModal';

  selectedNotification: any = null;
  notifications: any[] = [];
  idNotif: number = 0;
  paginatedNotification: any[] = [];

  selectedNotificationId: number | null = null;
  btEnabled: boolean = false;
  showModalOpenBloquerDebloquer = false;
  errorMessage: string = '';
  isloadingBloquerDebloquer: boolean = false;

  modules: any[] = [];
  niveauxUrgence: any[] = [];

  typeAlertes: AlerteType[] = [
    {id: 'URGENT', description: 'URGENT'},
    {id: 'INFO', description: 'INFO'},
  ];

  constructor(
    private fb: FormBuilder,
    private modalsService: ModalsService,
    private toastr: ToastrService,
    private notifService: NotificationsService,
    private alertesService: AlertesService,
    private cd: ChangeDetectorRef,
    public paginationService: PaginationsService
  ) {
  }

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.notifForm, name);
  isValid = (name: string) => isValid(this.notifForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.notifForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.notifForm, name);

  // A l'initialisation du composant
  ngOnInit(): void {
    this.modalsService.closeAllModals();

    /**
     * message
     * idNiveauUrgence
     * typeAlerte
     * description
     * limiteDeclenchement
     * idModule
     */
    this.notifForm = this.fb.group({
      message: ['', Validators.required],
      idNiveauUrgence: ['', Validators.required],
      typeAlerte: ['', Validators.required],
      description: ['', Validators.required],
      limiteDeclenchement: ['', Validators.required],
      idModule: ['', Validators.required],
    });

    // Chargement des donnees
    this.loadNotifications();
    this.loadModules();
    this.loadNiveauxUrgence();
  }

  // Ouverture de modal
  openModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);

    if (!isModalOpen) {
      this.modalsService.openModal(modalId);
      this.notifForm.reset();
    }

    this.modalsService.closeModal(modalId);
    this.modalsService.closeAllModals();
  }

  // A la creation de la notification
  onCreate() {
    if (this.notifForm.invalid) {
      this.notifForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const dataToSend = {...this.notifForm.value};
    console.log('Data to send : ', dataToSend);

    this.notifService.createNotification(dataToSend).subscribe({
      next: (res) => {
        this.isLoading = false
        this.notifForm.reset();
        this.modalsService.closeAllModals();

        this.toastr.success(res?.message || 'Notification créée avec succès !', '', {
          positionClass: 'toast-custom-center',
        });

        this.paginationService.reset();
        this.updatePaginatedData();
        this.loadNotifications();

        console.log('✅ Notification créée :', res);
      },

      error: (err) => {
        this.isLoading = false

        this.toastr.error(err?.message || "Erreur lors de la creation de l'alerte", '', {
          positionClass: 'toast-custom-center',
        });
        console.log('Erreur create notification : ', err);
      },
    });
  }

  // A l'edition
  onEdit(notification: any) {
    this.openModal('updateNotificationModal');
    this.selectedNotification = {...notification};
    this.idNotif = this.selectedNotification.id;

    console.log('selected notification : ', this.selectedNotification);

    this.notifForm.patchValue({
      message: notification.messageNotification,
      idNiveauUrgence: notification.idNiveauDurgence,
      typeAlerte: notification.type,
      groupeConcerne: notification.groupeConcerne,
      description: notification.vcDescription,
      limiteDeclenchement: notification.limiteDeclenchementNotification,
      idModule: notification.idModule,
    });

    this.cd.detectChanges();
  }

  // A la modification
  onUpdate(): void {
    if (this.notifForm.invalid) {
      this.notifForm.markAllAsTouched();
      console.log('Formulaire invalide !');
      return;
    }

    this.isLoading = true;

    // On récupère les données du formulaire
    const formData = {
      ...this.notifForm.value,
      idNotiification: this.idNotif,
    };
    console.log('form data : ', formData);

    // On construit l'objet a envoyer
    const dataToSend = {
      message: formData.message,
      idNiveauUrgence: formData.idNiveauUrgence,
      typeAlerte: formData.typeAlerte,
      description: formData.description,
      limiteDeclenchement: formData.limiteDeclenchement,
      idModule: formData.idModule,
      idNotiification: this.idNotif,
    };
    console.log('🟢 Données envoyées :', dataToSend);

    // Appel au service de modification
    this.notifService.uppdateNotification(dataToSend).subscribe({
      next: (res) => {
        console.log('Modification effectuer avec success : ', res?.message);
        this.toastr.success('Modification effectuer avec success ', '', {
          positionClass: 'toast-custom-center',
        });

        this.paginationService.reset();
        this.updatePaginatedData();
      },

      error: (err) => {
        console.log('Erreur de modification : ', err);
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
      },

      complete: () => {
        this.isLoading = false;
        this.modalsService.closeModal('updateNotificationModal');
        this.modalsService.closeAllModals();
        this.loadNotifications();
      },
    });
  }

  onToggle(notification: any) {
    this.openModal('bloquerDebloquerModal');
    this.selectedNotificationId = notification.id;
    this.btEnabled = notification.statusNotification === '0';
    console.log('Selected notification : ', notification);
  }

  bloquerEtDebloquer(): void {
    if (this.isloadingBloquerDebloquer) return; // 🔒 empêche le double clic
    if (this.selectedNotificationId === null) {
      this.toastr.error('Aucune notification sélectionnée.');
      return;
    }

    this.isloadingBloquerDebloquer = true;

    const params = {
      idNotification: this.selectedNotificationId,
      btEnabled: this.btEnabled,
    };

    this.notifService.toggleNotification(params).subscribe({
      next: (res) => {
        this.showModalOpenBloquerDebloquer = false;
        this.isloadingBloquerDebloquer = false;

        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });

        this.loadNotifications();
        this.updatePaginatedData();

        this.modalsService.closeModal('bloquerDebloquerModal');

        console.log('res api : ', res);
      },

      error: (err) => {
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('err api : ', err);
        this.isloadingBloquerDebloquer = false;
        this.modalsService.closeModal('bloquerDebloquerModal');
      },
    });
  }

  private loadNotifications(): void {
    this.isLoadingNotif = true;

    this.notifService.getListeNotificationsConfig().subscribe({
      next: (res) => {
        this.notifications = res.data || [];

        this.paginationService.setData(
          this.notifications,
          this.paginationService.itemsPerPage
        );

        this.paginatedNotification = this.paginationService.getPaginatedData();
        console.log('Notification liste : ', this.notifications);
        this.isLoadingNotif = false;
      },

      error: (err) => {
        console.log('Erreur chargement notifications : ', err);
        this.isLoadingNotif = false;
      },
      // complete: () => (this.isLoadingNotif = false),
    });
  }

  private loadModules(): void {
    this.isLoadingModules = true;
    this.alertesService.getListeModules().subscribe({
      next: (res) => (this.modules = res.data),
      error: (err) => console.error('Erreur chargement modules', err),
      complete: () => (this.isLoadingModules = false),
    });
  }

  private loadNiveauxUrgence(): void {
    this.isLoadingNiveaux = true;
    this.alertesService.getListeNiveauUrgence().subscribe({
      next: (res) => (this.niveauxUrgence = res.data),
      error: (err) => console.error('Erreur chargement niveaux : ', err),
      complete: () => (this.isLoadingNiveaux = false),
    });
  }

  // Mise a jour de la pagination
  updatePaginatedData(): void {
    this.paginatedNotification = this.paginationService.getPaginatedData();
  }

  // Page suivante
  nextPage(): void {
    this.paginationService.goToNextPage();
    this.updatePaginatedData();
  }

  // Page precedante
  previousPage(): void {
    this.paginationService.goToPreviousPage();
    this.updatePaginatedData();
  }

  // Premiere page
  firstPage(): void {
    this.paginationService.goToFirstPage();
    this.updatePaginatedData();
  }

  // Derniere page
  lastPage(): void {
    this.paginationService.goToLastPage();
    this.updatePaginatedData();
  }

  // Aller a la page
  goToPage(page: number): void {
    this.paginationService.currentPage = page;
    this.updatePaginatedData();
  }
}
