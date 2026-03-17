// import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { Router, RouterLink, RouterOutlet } from '@angular/router';
// // import { ToastrService } from 'ngx-toastr';
// import { UserModel } from '../../core/models/user.model';
// import { AuthService } from '../../services/auth/authService/auth.service';
// import { StatusBancaireService } from '../../services/status-bancaire/status-bancaire.service';
// import { NotificationService } from '../../services/notification/notification.service';

// @Component({
//   selector: 'app-layout',
//   imports: [RouterOutlet, RouterLink, UpperCasePipe, DatePipe, NgIf],
//   templateUrl: './layout.component.html',
//   styleUrl: './layout.component.css',
// })
// export class LayoutComponent implements OnInit {
//   public notification = inject(NotificationService);
//   // Information de l'utilisateur courrant
//   currentUser!: UserModel;
//   userCurrentTimeZone: string = '';

//   // CoreBankingStatus
//   statusCoreBanking: any;
//   showNetworkNotification = false;
//   statusMessage: string = 'Probleme de connection ou service indisponible';

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     // private toastr: ToastrService,

//     private statutBancaireService: StatusBancaireService,
//   ) {}

//   ngOnInit(): void {
//     this.currentUser = this.authService.getUserInfo();
//     this.recuperStatusCoreBanking();
//     console.log(
//       'current user : ',
//       this.currentUser,
//       ' => est du type UserModel',
//     );
//   }

//   // recuperStatusCoreBanking() {
//   //   this.statutBancaireService.coreBankingStatus().subscribe({
//   //     next: (response: any) => {
//   //       // Si la condition est respecter (i.e : available === false && status === 'KO)
//   //       if (
//   //         response?.data.available === false &&
//   //         response?.data.status === 'KO'
//   //       ) {
//   //         // Assigner le message de l'api dans data et afficher l'icon
//   //         this.statusMessage = response.data.message;
//   //         this.statusCoreBanking = response.data;
//   //         this.showNetworkNotification = true;
//   //       }
//   //       console.log('network status : ', this.statusCoreBanking);
//   //     },
//   //     error: () => {
//   //       // en cas d'erreur API → considérer comme indisponible
//   //       this.showNetworkNotification = false;
//   //     },
//   //   });
//   // }

//   recuperStatusCoreBanking() {
//     this.statutBancaireService.coreBankingStatus().subscribe({
//       next: (response: any) => {
//         this.statusCoreBanking = response.data;
//         console.log('this.statusCoreBanking: ', this.statusCoreBanking);

//         if (
//           this.statusCoreBanking?.available === false &&
//           this.statusCoreBanking?.status === 'ko'
//         ) {
//           // afficher notification seulement si service indisponible
//           this.showNetworkNotification =
//             this.statusCoreBanking?.available === true;
//         } else {
//           this.showNetworkNotification =
//             this.statusCoreBanking?.available === false;
//         }
//       },
//       error: () => {
//         // en cas d'erreur API → considérer comme indisponible
//         this.showNetworkNotification = false;
//       },
//     });
//   }
//   // Méthode de déconnexion et de redirection vers la page de login
//   onLogout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }

//   // Méthode de déconnexion et de redirection vers la page de login
//   logout(): void {
//     this.authService.deconnexion().subscribe({
//       next: (res) => {
//         if (res.status && res.status === 200) {
//           console.log('Déconnexion réussie :', res);

//           this.notification.success(res.message);
//           // this.toastr.success(res.message, '', {
//           //   positionClass: 'toast-custom-center',
//           // });

//           // Nettoyage déjà fait dans le service, redirection après succès
//           this.router.navigate(['/login']);
//         } else {
//           if (res.error.error.message === 'Unauthenticated.') {
//             this.notification.success('Votre session a expiré');
//             // Nettoyage déjà fait dans le service, redirection après succès
//             this.router.navigate(['/login']);
//           }
//         }
//       },

//       error: (error) => {
//         this.notification.error('Erreur lors de la déconnexion');

//         console.error('Erreur lors de la déconnexion :', error);
//       },
//     });
//   }

//   // Ajoute une méthode getUser() pour exposer le signal value dans le template
//   getUser() {
//     return this.authService.userInfo();
//   }

//   getUserInfoConfig() {
//     const result = this.authService.userInfoConfig();
//     // console.log('Résultat de userInfoConfig:', result);

//     const dataConfig = result;
//     // console.log('dataConfig : ', dataConfig);
//     if (dataConfig) {
//       this.userCurrentTimeZone = dataConfig.organisation.find(
//         (c: any) => c.vcKey === 'TimeZone',
//       )?.vcValue;
//       // console.log('userCurrentTimeZone : ', this.userCurrentTimeZone);
//     }
//     return result;
//   }
// }



import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  Renderer2,
  AfterViewInit,
  Inject,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter, Subscription, interval } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../services/auth/authService/auth.service';
import { StatusBancaireService } from '../../services/status-bancaire/status-bancaire.service';
import { NotificationService } from '../../services/notification/notification.service';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, DatePipe, NgIf],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public notification = inject(NotificationService);

  currentUser!: UserModel;
  userCurrentTimeZone: string = '';
  statusCoreBanking: any;
  showNetworkNotification = false;
  statusMessage: string = 'Problème de connection ou service indisponible';
  isDarkMode = false;

  private statusPolling$?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private statutBancaireService: StatusBancaireService,
    public sidebarService: SidebarService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    this.recuperStatusCoreBanking();

    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme(this.isDarkMode);

    // Sidebar initialization
    this.applySidebarState();

    // Listen to window resize for responsive
    window.addEventListener('resize', this.onResize.bind(this));

    // Listen to navigation changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
          this.sidebarService.isSidebarCollapsed = true;
        }
        this.applySidebarState();
        this.applyTheme(this.isDarkMode);
      });

    this.startPolling();
  }

  ngAfterViewInit(): void {
    // Initial check for mobile
    this.onResize();
  }

  ngOnDestroy(): void {
    this.statusPolling$?.unsubscribe();
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  // Responsive handler
  private onResize(): void {
    if (window.innerWidth <= 768) {
      this.sidebarService.isSidebarCollapsed = true;
    } else {
      // Optionally restore on desktop
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        this.sidebarService.isSidebarCollapsed = savedState === 'true';
      }
    }
    this.applySidebarState();
  }

  // ── Core Banking Status ─────────────────────────────────────────────────────
  recuperStatusCoreBanking(): void {
    this.statutBancaireService.coreBankingStatus().subscribe({
      next: (response: any) => {
        this.statusCoreBanking = response.data;
        this.showNetworkNotification =
          this.statusCoreBanking?.available === false;
        if (this.showNetworkNotification) {
          this.statusMessage =
            this.statusCoreBanking?.message || this.statusMessage;
        }
      },
      error: () => {
        this.showNetworkNotification = false;
      },
    });
  }

  startPolling(): void {
    this.statusPolling$ = interval(10000).subscribe(() =>
      this.recuperStatusCoreBanking(),
    );
  }

  // ── Auth ────────────────────────────────────────────────────────────────────
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.deconnexion().subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.notification.success(res.message);
          this.router.navigate(['/login']);
        } else if (res.error?.error?.message === 'Unauthenticated.') {
          this.notification.success('Votre session a expiré');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion :', err);
        this.notification.error('Erreur lors de la déconnexion');
      },
    });
  }

  getUser() {
    return this.authService.userInfo();
  }

  getUserInfoConfig() {
    const result = this.authService.userInfoConfig();
    if (result) {
      const tz = result.organisation?.find((c: any) => c.vcKey === 'TimeZone');
      this.userCurrentTimeZone = tz?.vcValue || '';
    }
    return result;
  }

  // ── Sidebar ──────────────────────────────────────────────────────────────────
  private applySidebarState(): void {
    const size = this.sidebarService.isSidebarCollapsed ? 'sm' : 'lg';
    this.renderer.setAttribute(this.document.body, 'data-sidebar-size', size);

    if (this.sidebarService.isSidebarCollapsed) {
      this.renderer.removeClass(this.document.body, 'sidebar-enable');
    } else {
      this.renderer.addClass(this.document.body, 'sidebar-enable');
    }
  }

  toggleSidebar(): void {
    this.sidebarService.isSidebarCollapsed =
      !this.sidebarService.isSidebarCollapsed;
    this.applySidebarState();
  }

  toggleSubMenu(menuId: string, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.sidebarService.toggleSubMenu(menuId);
  }

  isSubMenuOpen(menuId: string): boolean {
    return this.sidebarService.isSubMenuOpen(menuId);
  }

  onMenuClick(): void {
    // Close sidebar on mobile after menu click
    if (window.innerWidth <= 768) {
      this.sidebarService.isSidebarCollapsed = true;
      this.applySidebarState();
    }
  }

  // ── Thème ────────────────────────────────────────────────────────────────────
  setLightThemeAsDefault(): void {
    this.isDarkMode = false;
    this.applyTheme(this.isDarkMode);
    localStorage.setItem('theme', 'light');
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme(this.isDarkMode);
  }

  applyTheme(isDark: boolean): void {
    const body = this.document.body;
    if (isDark) {
      this.renderer.setAttribute(body, 'data-bs-theme', 'dark');
      this.renderer.setAttribute(body, 'data-sidebar', 'dark');
      this.renderer.setAttribute(body, 'data-topbar', 'dark');
    } else {
      this.renderer.setAttribute(body, 'data-bs-theme', 'light');
      this.renderer.setAttribute(body, 'data-sidebar', 'brand');
      this.renderer.setAttribute(body, 'data-topbar', 'brand');
    }
    this.renderer.setAttribute(body, 'data-layout-scrollable', 'false');
    this.renderer.setAttribute(body, 'data-layout-size', 'fluid');
    this.renderer.addClass(body, 'mat-typography');
  }
}
