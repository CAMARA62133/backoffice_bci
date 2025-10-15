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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
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
    });
  }
}
