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
    private mesNotifs: MesNotifsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.isLoading = true;

    this.mesNotifs.mesNotifications(this.currentUser.iRoleID).subscribe({
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
}
