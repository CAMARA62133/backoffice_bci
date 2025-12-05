import {NgFor, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/authService/auth.service';
import {MesNotifsService} from '../../services/mesNotifs/mes-notifs.service';
import {DataTableDirective} from '../../core/directives/data-table/data-table.directive';

declare var bootstrap: any;

@Component({
  selector: 'app-mes-notifications',
  imports: [FormsModule, NgFor, NgIf, DataTableDirective],
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

  // Constructeur
  constructor(
    private mesNotifsService: MesNotifsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  // A l'initialisation du composant
  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    this.loadNotifications();
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
