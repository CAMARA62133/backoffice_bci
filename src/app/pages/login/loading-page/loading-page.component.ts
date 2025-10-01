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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token']; // Récupération du token depuis les paramètres de la route
      console.log('✅ Token récupéré automatiquement :', this.token);

      //
      localStorage.setItem('urlToken', this.token);

      this.loadingService.verifierToken(this.token).subscribe({
        next: (res) => {
          console.log('After set tokenfdsjfkjdfk');
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
