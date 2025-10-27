import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  private warningTimeoutId: any;
  private countdownInterval: any;

  // ⏱️ 15 minutes d'inactivité (production)
  private readonly INACTIVITY_TIME = 15 * 60 * 1000;
  private readonly WARNING_TIME = 60 * 1000; // ⏰ avertissement à 1 minute avant la déconnexion
  private countdownValue = 60; // 🕐 60 secondes

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  startWatching(): void {
    this.resetTimer();

    // 🔄 Écoute toutes les activités utilisateur
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(
      (event) => {
        window.addEventListener(event, () => this.resetTimer());
      }
    );
  }

  private resetTimer(): void {
    // 🧹 Nettoyage
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.toastr.clear();

    // ⏰ Timer principal (déconnexion automatique)
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => this.handleInactivity());
      }, this.INACTIVITY_TIME);

      // ⚠️ Timer d'avertissement : 1 minute avant
      this.warningTimeoutId = setTimeout(() => {
        this.ngZone.run(() => this.showWarningToastr());
      }, this.INACTIVITY_TIME - this.WARNING_TIME);
    });
  }

  private showWarningToastr(): void {
    this.countdownValue = 60;

    // 🔔 Toastr fixe sans timeout
    const toast = this.toastr.error(
      `Vous allez être déconnecté dans 1 minute.`,
      '',
      {
        disableTimeOut: true,
        tapToDismiss: false,
        closeButton: false,
        positionClass: 'toast-custom-center', // ou 'toast-bottom-right'
      }
    );

    // ⏳ Décrémentation du message chaque seconde
    this.countdownInterval = setInterval(() => {
      this.countdownValue--;

      if (this.countdownValue > 0) {
        const message =
          this.countdownValue > 1
            ? `Vous allez être déconnecté dans ${this.countdownValue} secondes.`
            : `Vous allez être déconnecté dans 1 seconde.`;

        if (toast.toastRef.componentInstance) {
          toast.toastRef.componentInstance.message = message;
        }
      } else {
        clearInterval(this.countdownInterval);
        this.toastr.clear();
        this.handleInactivity();
      }
    }, 1000);
  }

  private handleInactivity(): void {
    console.log('⏳ Utilisateur inactif — déconnexion automatique.');
    this.authService.deconnexion().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
