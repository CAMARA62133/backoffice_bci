// import {Injectable, NgZone} from '@angular/core';
// import {Router} from '@angular/router';
// import {ToastrService} from 'ngx-toastr';
// import {AuthService} from '../authService/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class InactivityService {

//   private timeoutId: any;
//   private warningTimeoutId: any;
//   private countdownInterval: any;

//   private readonly INACTIVITY_TIME = 15 * 60 * 1000; // 15 min
//   private readonly WARNING_TIME = 30 * 1000; // 30 sec
//   private countdownValue = 30;

//   constructor(
//     private router: Router,
//     private ngZone: NgZone,
//     private authService: AuthService,
//     private toastr: ToastrService
//   ) {
//   }

//   // 🚀 Démarrer la surveillance
//   startWatching(): void {
//     this.resetTimer();

//     ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) =>
//       window.addEventListener(event, () => this.resetTimer())
//     );

//     console.log("🟢 Surveillance d'inactivité démarrée.");
//   }

//   // 🛑 Stopper la surveillance
//   stopWatching(): void {
//     if (this.timeoutId) clearTimeout(this.timeoutId);
//     if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);
//     if (this.countdownInterval) clearInterval(this.countdownInterval);
//     this.toastr.clear();

//     ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) =>
//       window.removeEventListener(event, () => this.resetTimer())
//     );

//     console.log("🔴 Surveillance d'inactivité arrêtée.");
//   }

//   private resetTimer(): void {
//     if (this.timeoutId) clearTimeout(this.timeoutId);
//     if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);
//     if (this.countdownInterval) clearInterval(this.countdownInterval);
//     this.toastr.clear();

//     this.ngZone.runOutsideAngular(() => {
//       this.timeoutId = setTimeout(() => {
//         this.ngZone.run(() => this.handleInactivity());
//       }, this.INACTIVITY_TIME);

//       this.warningTimeoutId = setTimeout(() => {
//         this.ngZone.run(() => this.showWarningToastr());
//       }, this.INACTIVITY_TIME - this.WARNING_TIME);
//     });
//   }

//   private showWarningToastr(): void {
//     this.countdownValue = this.WARNING_TIME / 1000;

//     const toast = this.toastr.error(
//       `Vous allez être déconnecté dans ${this.countdownValue} secondes.`,
//       '',
//       {
//         disableTimeOut: true,
//         tapToDismiss: false,
//         closeButton: false,
//         positionClass: 'toast-custom-center',
//       }
//     );

//     this.countdownInterval = setInterval(() => {
//       this.countdownValue--;
//       if (this.countdownValue > 0) {
//         const message =
//           this.countdownValue > 1
//             ? `Vous allez être déconnecté dans ${this.countdownValue} secondes.`
//             : `Vous allez être déconnecté dans 1 seconde.`;

//         if (toast.toastRef.componentInstance) {
//           toast.toastRef.componentInstance.message = message;
//         }
//       } else {
//         clearInterval(this.countdownInterval);
//         this.toastr.clear();
//         this.handleInactivity();
//       }
//     }, 1000);
//   }

//   private handleInactivity(): void {
//     console.log('⏳ Utilisateur inactif — déconnexion automatique.');
//     // Déconnexion via le backend, session cookie
//     this.authService.deconnexion().subscribe({
//       next: () => {
//         this.stopWatching();
//         this.router.navigate(['/login']);
//       },
//       error: () => {
//         this.stopWatching();
//         this.router.navigate(['/login']);
//       },
//     });
//   }

//   // private timeoutId: any;
//   // private warningTimeoutId: any;
//   // private countdownInterval: any;
//   //
//   // // ⏱️ 15 minutes d'inactivité (ici 1 min pour test)
//   // private readonly INACTIVITY_TIME = 15 * 60 * 1000;
//   // private readonly WARNING_TIME = 60 * 1000;
//   // private countdownValue = 60;
//   //
//   // constructor(
//   //   private router: Router,
//   //   private ngZone: NgZone,
//   //   private authService: AuthService,
//   //   private toastr: ToastrService
//   // ) {
//   // }
//   //
//   // // 🚀 Démarrer la surveillance
//   // startWatching(): void {
//   //   // ⚠️ Ne démarre que si l'utilisateur est connecté
//   //   if (!this.authService.isAuthenticated()) {
//   //     console.warn('⛔ Inactivité non démarrée : utilisateur non connecté.');
//   //     return;
//   //   }
//   //
//   //   this.resetTimer();
//   //
//   //   // 🔄 Écoute les activités utilisateur
//   //   ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(
//   //     (event) => {
//   //       window.addEventListener(event, () => this.resetTimer());
//   //     }
//   //   );
//   //
//   //   console.log("🟢 Surveillance d'inactivité démarrée.");
//   // }
//   //
//   // // 🛑 Stopper la surveillance
//   // stopWatching(): void {
//   //   if (this.timeoutId) clearTimeout(this.timeoutId);
//   //   if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);
//   //   if (this.countdownInterval) clearInterval(this.countdownInterval);
//   //   this.toastr.clear();
//   //
//   //   // Retirer les écouteurs
//   //   ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(
//   //     (event) => {
//   //       window.removeEventListener(event, () => this.resetTimer());
//   //     }
//   //   );
//   //
//   //   console.log("🔴 Surveillance d'inactivité arrêtée.");
//   // }
//   //
//   // private resetTimer(): void {
//   //   if (this.timeoutId) clearTimeout(this.timeoutId);
//   //   if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId);
//   //   if (this.countdownInterval) clearInterval(this.countdownInterval);
//   //   this.toastr.clear();
//   //
//   //   if (!this.authService.isAuthenticated()) return;
//   //
//   //   this.ngZone.runOutsideAngular(() => {
//   //     this.timeoutId = setTimeout(() => {
//   //       this.ngZone.run(() => this.handleInactivity());
//   //     }, this.INACTIVITY_TIME);
//   //
//   //     this.warningTimeoutId = setTimeout(() => {
//   //       this.ngZone.run(() => this.showWarningToastr());
//   //     }, this.INACTIVITY_TIME - this.WARNING_TIME);
//   //   });
//   // }
//   //
//   // private showWarningToastr(): void {
//   //   this.countdownValue = this.WARNING_TIME / 1000;
//   //
//   //   const toast = this.toastr.error(
//   //     `Vous allez être déconnecté dans ${this.countdownValue} secondes.`,
//   //     '',
//   //     {
//   //       disableTimeOut: true,
//   //       tapToDismiss: false,
//   //       closeButton: false,
//   //       positionClass: 'toast-custom-center',
//   //     }
//   //   );
//   //
//   //   this.countdownInterval = setInterval(() => {
//   //     this.countdownValue--;
//   //     if (this.countdownValue > 0) {
//   //       const message =
//   //         this.countdownValue > 1
//   //           ? `Vous allez être déconnecté dans ${this.countdownValue} secondes.`
//   //           : `Vous allez être déconnecté dans 1 seconde.`;
//   //
//   //       if (toast.toastRef.componentInstance) {
//   //         toast.toastRef.componentInstance.message = message;
//   //       }
//   //     } else {
//   //       clearInterval(this.countdownInterval);
//   //       this.toastr.clear();
//   //       this.handleInactivity();
//   //     }
//   //   }, 1000);
//   // }
//   //
//   // private handleInactivity(): void {
//   //   console.log('⏳ Utilisateur inactif — déconnexion automatique.');
//   //   this.authService.deconnexion().subscribe({
//   //     next: () => {
//   //       this.stopWatching();
//   //       this.router.navigate(['/login']);
//   //     },
//   //     error: () => {
//   //       this.stopWatching();
//   //       this.router.navigate(['/login']);
//   //     },
//   //   });
//   // }
// }

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityServiceTsService {
  private timeoutId: any;
  private warningTimeoutId: any;

  private isWatching = false;
  private warningShown = false;

  // 🔥 CONFIGURATION
  private readonly TIMEOUT_DURATION = 15 * 60 * 1000; // 60 secondes
  private readonly WARNING_BEFORE = 30 * 1000; // 30 secondes avant logout

  private readonly EVENTS = [
    'mousemove',
    'keydown',
    'click',
    'scroll',
    'touchstart',
  ];

  // Référence stable pour removeEventListener
  private boundResetTimer = () => this.resetTimer();

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private notification: NotificationService,
  ) {}

  // 🚀 Démarrer la surveillance
  startWatching(): void {
    if (this.isWatching) return;

    this.isWatching = true;

    this.ngZone.runOutsideAngular(() => {
      this.EVENTS.forEach((event) =>
        window.addEventListener(event, this.boundResetTimer),
      );
    });

    this.resetTimer();
  }

  // 🔄 Réinitialiser le timer à chaque activité
  private resetTimer(): void {
    clearTimeout(this.timeoutId);
    clearTimeout(this.warningTimeoutId);

    this.warningShown = false;

    const warningTime = this.TIMEOUT_DURATION - this.WARNING_BEFORE;

    // 🔔 Timer d'avertissement
    if (warningTime > 0) {
      this.warningTimeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          if (!this.warningShown) {
            this.warningShown = true;
            this.notification.error(
              "Vous serez déconnecté dans 30 secondes en raison d'inactivité.",
            );
          }
        });
      }, warningTime);
    }

    // 🚪 Timer de déconnexion
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => this.logout());
    }, this.TIMEOUT_DURATION);
  }

  // 🚪 Déconnexion
  private logout(): void {
    this.notification.error('Session expirée. Vous avez été déconnecté.');

    localStorage.removeItem('token');

    this.stopWatching();

    this.router.navigate(['/login']);
  }

  // 🛑 Arrêter la surveillance
  stopWatching(): void {
    clearTimeout(this.timeoutId);
    clearTimeout(this.warningTimeoutId);

    this.isWatching = false;
    this.warningShown = false;

    this.EVENTS.forEach((event) =>
      window.removeEventListener(event, this.boundResetTimer),
    );
  }
}
