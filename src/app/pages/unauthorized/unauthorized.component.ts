import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-unauthorized',
  imports: [NgIf],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {
  // optionnel : compte à rebours avant redirection automatique (0 pour désactiver)
  autoRedirectSeconds = 8;
  remaining = this.autoRedirectSeconds;

  constructor(private router: Router) {
    if (this.autoRedirectSeconds > 0) {
      this.startCountdown();
    }
  }

  startCountdown(): void {
    const tick = () => {
      if (this.remaining > 0) {
        setTimeout(() => {
          this.remaining--;
          tick();
        }, 1000);
      } else {
        // rediriger vers la page d'accueil ou login
        this.router.navigateByUrl('/');
      }
    };
    tick();
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  goBack(): void {
    window.history.length > 1
      ? window.history.back()
      : this.router.navigateByUrl('/');
  }
}
