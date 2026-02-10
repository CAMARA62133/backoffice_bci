import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth/authService/auth.service';
import { MesNotifsService } from '../../services/mesNotifs/mes-notifs.service';

declare var bootstrap: any;

@Component({
  selector: 'app-mes-notifications',
  imports: [FormsModule, NgFor, NgIf, DataTablesModule],
  templateUrl: './mes-notifications.component.html',
  styleUrl: './mes-notifications.component.css',
})
export class MesNotificationsComponent implements OnInit {
  isLoading: boolean = false;
  notifications: any[] = [];
  currentUser: any = null;

  selectedUserId: number | null = null;
  btEnabled: boolean = false;
  errorMessage: string = '';
  isloadingBloquerDebloquer: boolean = false;

  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  // Constructeur
  constructor(
    private mesNotifsService: MesNotifsService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  // A l'initialisation du composant
  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    this.loadNotifications();

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

  /**
   * Chargement des notifications par defaut l'utilisateur connecter
   * @private
   */
  private loadNotifications(): void {
    this.isLoading = true;

    this.mesNotifsService.mesNotifications(this.currentUser.id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.notifications = res.data;
        this.dttrigger.next(null);
        console.log('Erreur chargement mes notifs : ', res);
      },

      error: (err) => {
        this.toastr.error(err?.message);
        console.log('Erreur chargement mes notifs : ', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Ouvrir le modal de confirmation de blocage ou de deblocage
   * @param notification
   */
  openModalBloquerDebloquer(notification: any) {
    this.selectedUserId = notification.id;
    this.btEnabled = notification.btEnabled === '0';
  }

  /**
   * Fermer le modal de blocage
   */
  closeModalBloquerDebloquer() {
    const modalElement = document.getElementById('bloquerDebloquerModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }

    if (this.isloadingBloquerDebloquer) return; // 🔒 bloque la fermeture pendant le chargement
  }

  /**
   * Bloaquer et Debloquer
   */
  bloquerEtDebloquer(): void {
    if (this.isloadingBloquerDebloquer) return; // 🔒 empêche le double clic
    if (this.selectedUserId === null) {
      this.toastr.error('Aucune notification sélectionnée.', '', {
        positionClass: 'toast-custom-center',
      });
      return;
    }

    this.isloadingBloquerDebloquer = true;

    const params = {
      idNotification: this.selectedUserId,
      btEnabled: this.btEnabled,
    };

    this.mesNotifsService.setToggleNotification(params).subscribe({
      next: (res) => {
        this.isloadingBloquerDebloquer = false;

        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });

        this.loadNotifications();
        this.closeModalBloquerDebloquer();
      },

      error: (err) => {
        this.isloadingBloquerDebloquer = false;

        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });

        this.closeModalBloquerDebloquer();
      },
    });
  }
}
