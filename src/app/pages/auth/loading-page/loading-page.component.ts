import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../services/auth/loading/loading.service';

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
    private loadingService: LoadingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];

      // Recuperationd as
      localStorage.setItem('urlToken', this.token);
      localStorage.setItem('urlEmail', this.email);

      this.loadingService.verifierToken(this.token, this.email).subscribe({
        next: (res) => {
          console.log('DEBUG: After set token and email : ', res);
          if (res?.status && res?.status === 200) {
            this.router.navigate(['/nouveau-mot-de-passe']);
          } else {
            this.router.navigate(['/reinitialiser-mot-de-passe']);
            this.toastr.error(res?.message || 'Lien est expiré !', '', {
              positionClass: 'toast-custom-center',
            });
          }
        },
        error: (err) => {
          console.error('❌ Erreur lors de la vérification du token :', err);
        },
      });
    });
  }
}
