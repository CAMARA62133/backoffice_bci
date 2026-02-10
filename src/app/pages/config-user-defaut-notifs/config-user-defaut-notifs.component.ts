import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../core/utils/form-helpers';
import { RolesService } from '../../services/auth/roles/roles.service';
import { ConfigNotificationService } from '../../services/configNotification/config-notification.service';
import { ModalsService } from '../../services/modals/modals.service';
import { PaginationsService } from '../../services/paginations/paginations.service';

@Component({
  selector: 'app-config-user-defaut-notifs',
  imports: [
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    DataTablesModule,
  ],
  templateUrl: './config-user-defaut-notifs.component.html',
  styleUrl: './config-user-defaut-notifs.component.css',
})
export class ConfigUserDefautNotifsComponent implements OnInit {
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  isLoading: boolean = false;
  isLoadingRole: boolean = false;
  isLoadingDefaultNotif: boolean = false;

  roles: any[] = [];
  notifications: any[] = [];
  listeNotiificationUsersDefaut: any[] = [];

  defaultNotifications: any[] = [];
  paginatedDefaultNotifications: any[] = [];

  selectedDefaultNotif: any = null;
  idNotif: number = 0;

  configDefNotifForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private rolesService: RolesService,
    private configNotifService: ConfigNotificationService,
    private modalsService: ModalsService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public paginationService: PaginationsService,
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.configDefNotifForm, name);
  isValid = (name: string) => isValid(this.configDefNotifForm, name);
  getErrorMessage = (name: string) =>
    getErrorMessage(this.configDefNotifForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.configDefNotifForm, name);

  openModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);

    if (!isModalOpen) {
      this.modalsService.openModal(modalId);
      // this.notifForm.reset();
    }

    this.modalsService.closeModal(modalId);
    this.modalsService.closeAllModals();
  }

  ngOnInit(): void {
    this.modalsService.closeAllModals();

    this.configDefNotifForm = this.fb.group({
      idNotification: ['', Validators.required],
      iRoleID: ['', Validators.required],
    });

    // Chargement
    this.loadRoles();
    this.loadDefaultNotification();
    this.loadNotification();

    this.dtoptions = {
      paging: true,
      pagingType: 'full_numbers',
      // lengthMenu:[5, 10, 15, 20, 25, 30, 35, 50],
      // pageLength:8,
      scrollY: '350',

      language: {
        processing: 'Traitement en cours...',
        search: 'Rechercher&nbsp;:',
        lengthMenu: 'Afficher _MENU_ &eacute;l&eacute;ments',
        info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:
          "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:
          '(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)',
        infoPostFix: '',
        loadingRecords: 'Chargement en cours...',
        zeroRecords: 'Aucun &eacute;l&eacute;ment &agrave; afficher',
        emptyTable: 'Aucune donnée disponible dans le tableau',
        paginate: {
          first: 'Premier',
          previous: 'Pr&eacute;c&eacute;dent',
          next: 'Suivant',
          last: 'Dernier',
        },
      },

      select: true,
    };
  }

  onCreate(): void {
    if (this.configDefNotifForm.invalid) {
      this.configDefNotifForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const dataToSend = { ...this.configDefNotifForm.value };
    console.log('Data to send -> ', dataToSend);

    this.configNotifService.createNotificationDefaut(dataToSend).subscribe({
      next: (res) => {
        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('Notification configuer avec success', res);
        this.configDefNotifForm.reset();
        this.modalsService.closeAllModals();
        this.loadDefaultNotification();
      },

      error: (err) => {
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('Erreur configuration notif : ', err);
      },

      complete: () => (this.isLoading = false),
    });
  }

  onEdit(defNotif: any): void {
    this.openModal('updateDefaultNotif');
    this.selectedDefaultNotif = { ...defNotif };
    this.idNotif = this.selectedDefaultNotif.id;

    console.log('selected def notif -> ', this.selectedDefaultNotif);

    this.configDefNotifForm.patchValue({
      idNotification: this.selectedDefaultNotif.iNotificationID,
      iRoleID: this.selectedDefaultNotif.iRoleID,
    });

    this.cd.detectChanges();
  }

  onUpdate(): void {
    if (this.configDefNotifForm.invalid) {
      this.configDefNotifForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const formData = { ...this.configDefNotifForm.value };
    console.log({ formData });

    const dataToSend = {
      idNotification: formData.idNotification,
      iRoleID: formData.iRoleID,
      idNotif: this.idNotif,
    };

    console.log('data to send : ', dataToSend);

    // Appel a l'api de modification
    this.configNotifService.updateNotificationDefaut(dataToSend).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.toastr.success(res?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.loadDefaultNotification();
          console.log('Modification effectuer avec success : ', res?.message);
        } else {
          console.log('Erreur api : ', res?.message);
          this.toastr.error(res?.message);
        }
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
        this.loadDefaultNotification();
      },
    });
  }

  private loadNotification(): void {
    this.isLoadingDefaultNotif = true;
    this.configNotifService.getListeNotification().subscribe({
      next: (res) => (this.notifications = res.data),
      error: (err) => console.log('Erreur chargement default notif :', err),
      complete: () => (this.isLoadingDefaultNotif = false),
    });
  }

  private loadDefaultNotification(): void {
    this.isLoading = true;
    this.configNotifService.getListeNotiificationUsersDefaut().subscribe({
      next: (res) => {
        this.defaultNotifications = res.data;
        console.log('Default Notifi list : ', this.defaultNotifications);
        this.dttrigger.next(null);
      },

      error: (err) => console.log('Erreur chargement default notif :', err),

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private loadRoles(): void {
    this.isLoadingRole = true;
    this.rolesService.getAllRoles().subscribe({
      next: (res) => (this.roles = res.data),
      error: (err) => console.log('Erreur chargement role :', err),
      complete: () => (this.isLoadingRole = false),
    });
  }
}
