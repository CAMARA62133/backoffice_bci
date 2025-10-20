import { NgClass, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalsService } from '../../services/modals/modals.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import {
  getErrorMessage,
  getFormControlClass,
  isInvalid,
  isValid,
} from '../../utils/form-helpers';

@Component({
  selector: 'app-notifications',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationsComponent implements OnInit {
  notifForm!: FormGroup;
  isLoadingNotif: boolean = false;
  notifications: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalsService,
    private toastr: ToastrService,
    private notifService: NotificationsService
  ) {}

  // Raccourcis pour le template
  isInvalid = (name: string) => isInvalid(this.notifForm, name);
  isValid = (name: string) => isValid(this.notifForm, name);
  getErrorMessage = (name: string) => getErrorMessage(this.notifForm, name);
  getFormControlClass = (name: string) =>
    getFormControlClass(this.notifForm, name);

  ngOnInit(): void {
    this.modalService.closeAllModals();

    this.notifForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  onSubmit() {}

  private loadNotifications() {
    this.isLoadingNotif = true;
    this.notifService.getListeNotificationsConfig().subscribe({
      next: (res) => {
        if (res?.status && res?.status === 200) {
          this.isLoadingNotif = false;
          this.notifications = res.data;
          console.log('Liste notifications : ', this.notifications);
        }
      },

      error: (err) => {
        this.isLoadingNotif = false;
        console.log('Erreur chargement notifications : ', err);
      },
    });
  }
}
