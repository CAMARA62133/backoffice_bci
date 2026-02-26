import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../services/auth/authService/auth.service';
import { StatusBancaireService } from '../../services/status-bancaire/status-bancaire.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, DatePipe, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  // Information de l'utilisateur courrant
  currentUser!: UserModel;
  userCurrentTimeZone: string = '';

  // CoreBankingStatus
  statusCoreBanking: any;
  showNetworkNotification = false;
  statusMessage: string = 'Probleme de connection ou service indisponible';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private statutBancaireService: StatusBancaireService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    this.recuperStatusCoreBanking();
    console.log(
      'current user : ',
      this.currentUser,
      ' => est du type UserModel',
    );
  }

  // recuperStatusCoreBanking() {
  //   this.statutBancaireService.coreBankingStatus().subscribe({
  //     next: (response: any) => {
  //       // Si la condition est respecter (i.e : available === false && status === 'KO)
  //       if (
  //         response?.data.available === false &&
  //         response?.data.status === 'KO'
  //       ) {
  //         // Assigner le message de l'api dans data et afficher l'icon
  //         this.statusMessage = response.data.message;
  //         this.statusCoreBanking = response.data;
  //         this.showNetworkNotification = true;
  //       }
  //       console.log('network status : ', this.statusCoreBanking);
  //     },
  //     error: () => {
  //       // en cas d'erreur API → considérer comme indisponible
  //       this.showNetworkNotification = false;
  //     },
  //   });
  // }



  recuperStatusCoreBanking() {
    this.statutBancaireService.coreBankingStatus().subscribe({
      next: (response: any) => {
        this.statusCoreBanking = response.data;
        console.log('this.statusCoreBanking: ', this.statusCoreBanking);

        if (
          this.statusCoreBanking?.available === false &&
          this.statusCoreBanking?.status === 'ko'
        ) {
          // afficher notification seulement si service indisponible
          this.showNetworkNotification =
            this.statusCoreBanking?.available === true;
        } else {
          this.showNetworkNotification =
            this.statusCoreBanking?.available === false;
        }
      },
      error: () => {
        // en cas d'erreur API → considérer comme indisponible
        this.showNetworkNotification = false;
      },
    });
  }
  // Méthode de déconnexion et de redirection vers la page de login
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Méthode de déconnexion et de redirection vers la page de login
  logout(): void {
    this.authService.deconnexion().subscribe({
      next: (res) => {
        if (res.status && res.status === 200) {
          console.log('Déconnexion réussie :', res);

          this.toastr.success(res.message, '', {
            positionClass: 'toast-custom-center',
          });

          // Nettoyage déjà fait dans le service, redirection après succès
          this.router.navigate(['/login']);
        } else {
          if (res.error.error.message === 'Unauthenticated.') {
            this.toastr.success('Votre session a expiré', '', {
              positionClass: 'toast-custom-center',
            });
            // Nettoyage déjà fait dans le service, redirection après succès
            this.router.navigate(['/login']);
          }
        }
      },

      error: (error) => {
        this.toastr.error('Erreur lors de la déconnexion', '', {
          positionClass: 'toast-custom-center',
        });

        console.error('Erreur lors de la déconnexion :', error);
      },
    });
  }

  // Ajoute une méthode getUser() pour exposer le signal value dans le template
  getUser() {
    return this.authService.userInfo();
  }

  getUserInfoConfig() {
    const result = this.authService.userInfoConfig();
    // console.log('Résultat de userInfoConfig:', result);

    const dataConfig = result;
    // console.log('dataConfig : ', dataConfig);
    if (dataConfig) {
      this.userCurrentTimeZone = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'TimeZone',
      )?.vcValue;
      // console.log('userCurrentTimeZone : ', this.userCurrentTimeZone);
    }
    return result;
  }
}
