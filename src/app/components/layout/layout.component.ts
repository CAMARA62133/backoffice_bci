import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/authService/auth.service';
import {UserModel} from '../../core/models/user.model';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    console.log("current user : ", this.currentUser, " => est du type UserModel")
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

          this.toastr.success(res.message, '', {positionClass: 'toast-custom-center',});

          // Nettoyage déjà fait dans le service, redirection après succès
          this.router.navigate(['/login']);
        } else {

          if (res.error.error.message === "Unauthenticated.") {
            this.toastr.success("Votre session a expiré", '', {
              positionClass: 'toast-custom-center',
            });
            // Nettoyage déjà fait dans le service, redirection après succès
            this.router.navigate(['/login']);
          }

        }
      },

      error: (error) => {
        this.toastr.error("Erreur lors de la déconnexion", '', {
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
        (c: any) => c.vcKey === 'TimeZone'
      )?.vcValue;
      // console.log('userCurrentTimeZone : ', this.userCurrentTimeZone);
    }
    return result;
  }
}
