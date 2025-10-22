import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/authService/auth.service';
import { MesNotifsService } from '../../services/mesNotifs/mes-notifs.service';

@Component({
  selector: 'app-mes-notifications',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './mes-notifications.component.html',
  styleUrl: './mes-notifications.component.css',
})
export class MesNotificationsComponent implements OnInit {
  isLoading: boolean = false;
  notifications: any[] = [];
  currentUser: any = null;

  constructor(
    private mesNotifsService: MesNotifsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    console.log('org user : ', this.currentUser);
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.isLoading = true;

    this.mesNotifsService.mesNotifications(this.currentUser.id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.status && res?.status === 200) {
          this.notifications = res.data;
          console.log('res api => ', res);
        } else {
          this.toastr.error(res?.message);
          console.log('Erreur chargement mes notifs : ', res);
        }
      },

      error: (err) => {
        this.toastr.error(err?.message);
        console.log('Erreur chargement mes notifs : ', err);
      },
    });
  }

  onToggle(notification: any): void {
    // this.isLoading = true;

    const isActive = +notification.btEnabled === 1;

    const enable = isActive ? 0 : 1;
    console.log(enable);

    const params = { idNotification: notification.id, btEnabled: enable };
    const message = isActive
      ? 'Notification bloquée avec succès !'
      : 'Notification débloquée avec succès !';

    console.log(`${isActive ? 'Debloquage' : 'Bloquage'} : `, { notification });
    console.log('params : ', params);

    this.mesNotifsService.setToggleNotification(params).subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          console.log(res?.message);
          this.toastr.success(message);
          this.loadNotifications();
        } else {
          console.log(res?.message);
          this.toastr.error(res?.message);
          this.loadNotifications();
        }
        this.isLoading = false;
      },

      error: (err) => {
        console.log(err?.message);
        this.toastr.success(err?.message);
        this.isLoading = false;
      },
    });
  }
}
