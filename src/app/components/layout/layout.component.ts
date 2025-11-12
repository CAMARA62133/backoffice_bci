import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, DatePipe, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  // Information de l'utilisateur courrant
  currentUser: any;
  userCurrentTimeZone: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();

    // const dataConfig = this.authService.getUserInfoConfig();
    // console.log('dataConfig : ', dataConfig);

    // if (dataConfig) {
    //   this.userCurrentTimeZone = dataConfig.organisation.find(
    //     (c: any) => c.vcKey === 'TimeZone'
    //   )?.vcValue;
    //   console.log('userCurrentTimeZone : ', this.userCurrentTimeZone);
    // }
  }

  // Méthode de déconnexion et de redirection vers la page de login
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Méthode de déconnexion et de redirection vers la page de login
  logout(): void {
    this.authService.deconnexion().subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log('Déconnexion réussie :', response);
          // this.showNotification(response.message);
          this.toastr.success(response.message, '', {
            positionClass: 'toast-custom-center',
          });
          // Nettoyage déjà fait dans le service, redirection après succès
          this.router.navigate(['/login']);
        } else {
          // this.showNotification(response.message);
          this.toastr.error(response.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion :', error);
        // Même en cas d'erreur, on peut forcer la redirection vers la page de login
        // this.router.navigate(['/login']);
      },
    });
  }

  // Ajoute une méthode getUser() pour exposer le signal value dans le template
  getUser() {
    return this.authService.userInfo();
  }

  getUserInfoConfig() {
    const result = this.authService.userInfoConfig();
    console.log('Résultat de userInfoConfig:', result);

    const dataConfig = result;
    console.log('dataConfig : ', dataConfig);
    if (dataConfig) {
      this.userCurrentTimeZone = dataConfig.organisation.find(
        (c: any) => c.vcKey === 'TimeZone'
      )?.vcValue;
      console.log('userCurrentTimeZone : ', this.userCurrentTimeZone);
    }
    return result;
  }
}
