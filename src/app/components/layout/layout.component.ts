import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar

  ) { }

  showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar-otp',
    });
  }

  ngOnInit(): void {
    // 1. Vérifie si l'utilisateur est connecté
    if (this.authService.isAuthenticated()) {
      // 2. Si l'utilisateur est connecté, on essaie de récupérer ses informations
      const userInfo = this.authService.getUserInfo();

      if (userInfo) {
        // Affiche les informations de l'utilisateur dans la console
        console.log('Utilisateur actuellement connecté :', userInfo);
        // console.table(userInfo);
      } else {
        // Cas où l'utilisateur est techniquement "connecté" (token présent),
        // mais les données utilisateur n'ont pas encore été chargées ou sont manquantes.
        console.log(
          'Utilisateur connecté, mais les données utilisateur sont introuvables.'
        );
      }
    } else {
      console.log("Aucun utilisateur n'est connecté.");
    }
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
          this.showNotification(response.message);
          // Nettoyage déjà fait dans le service, redirection après succès
          this.router.navigate(['/login']);
        } else {
          this.showNotification(response.message);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion :', error);
        // Même en cas d'erreur, on peut forcer la redirection vers la page de login
        // this.router.navigate(['/login']);
      }
    });
  }
}
