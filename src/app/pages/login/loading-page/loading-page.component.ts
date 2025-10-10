import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-loading-page',
  imports: [],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css',
})
export class LoadingPageComponent implements OnInit {
  token!: string; // Déclaration de la variable token
  email!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token']; // Récupération du token depuis les paramètres de la route
      this.email = params['email'];

      console.log('✅ Token récupéré automatiquement 2 :', this.token);
      console.log('✅ Email récupéré automatiquement :', this.email);
      console.log('✅ Tous les paramètres récupéré automatiquement :', params);

      // Recuperationd as
      localStorage.setItem('urlToken', this.token);
      localStorage.setItem('urlEmail', this.email);

      // Vérification que les paramètres sont bien reçus
      if (this.token && this.email) {
        console.log('Tous les paramètres sont présents');
      } else {
        console.error('Paramètres manquants');
      }

      this.loadingService.verifierToken(this.token).subscribe({
        next: (res) => {
          console.log('DEBUG: After set token');
          console.log(res);
          if (res?.status && res?.status === 200) {
            this.router.navigate(['/nouveau-mot-de-passe']);
          }
        },
        error: (err) => {
          console.error('❌ Erreur lors de la vérification du token :', err);
        },
      });
    });
  }
}
