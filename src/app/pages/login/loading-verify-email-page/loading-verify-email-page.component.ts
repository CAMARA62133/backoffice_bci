import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-loading-verify-email-page',
  imports: [],
  templateUrl: './loading-verify-email-page.component.html',
  styleUrl: './loading-verify-email-page.component.css',
})
export class LoadingVerifyEmailPageComponent implements OnInit {
  token!: string;
  email!: string;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.route.queryParams.subscribe((params) => {
      // Construction des parametres
      this.token = params['token'];
      this.email = params['email'];

      // Debogage
      console.log('✅ DEBUG: Token valider email :', this.token);
      console.log('✅ DEBUG: Email valider email :', this.email);

      // Sauvegarde des parametres dans le localStorage
      localStorage.setItem('validateEmailUrlToken', this.token);
      localStorage.setItem('validateEmailUrlEmail', this.email);

      // Vérification que les paramètres sont bien reçus
      if (this.token && this.email) {
        console.log('Tous les paramètres sont présents');
      } else {
        console.error('Paramètres manquants');
      }

      // Appel au service de loading
      console.log('Appel du service de loading !!!');
      this.loadingService
        .checkTokenEmailOrganisation(this.token, this.email)
        .subscribe({
          next: (res) => {
            console.log(
              "DEBUG : After checking organisation's email and token"
            );
            console.log(res);
            if (res?.status && res?.status === 200) {
              this.router.navigate(['/valider-otp-email']);

              this.isLoading = false;
            }
          },

          error: (err) => {
            console.error(
              "❌ Erreur lors de la vérification du token et l'email ",
              err
            );

            this.isLoading = false;
          },
        });
    });
  }
}
