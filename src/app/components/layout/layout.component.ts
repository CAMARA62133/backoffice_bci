import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, DatePipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  // Information de l'utilisateur courrant
  // currentUser = {
  //   OTP: '',
  //   adresseOrganisation: '',
  //   btBlocked: '',
  //   btEnabled: '',
  //   businessEmailDomainOrganisation: '',
  //   cityOrganisation: '',
  //   contactOrganisation: '',
  //   dtCreated: '',
  //   dtLastUpdate: '',
  //   dtOTPExpiration: '',
  //   email: '',
  //   emailOrganisation: '',
  //   iOrganisationID: '',
  //   iRoleID: '',
  //   id: '',
  //   idResponsable: '',
  //   nameOrganisation: '',
  //   paysOrganisation: '',
  //   phoneNumberOrganisation: '',
  //   tiFailedLogin: '',
  //   vcFirstname: '',
  //   vcLastname: '',
  //   vcPhoneNumber: '',
  //   vcRoleName: '',
  // };

  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
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
}
