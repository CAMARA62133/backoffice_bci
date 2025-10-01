import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  // Formulaire de connexion
  loginForm!: FormGroup;

  // Variables pour la gestion des messages et du chargement
  message: any = '';
  success: boolean = false;
  loading: boolean = false;

  // Lifecycle hook appelé à l'initialisation du composant
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      // recaptcha: ['', Validators.required],
    });
  }

  /**
   * Méthode pour gérer la connexion de l'utilisateur
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.message = '';

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const appName = environment.appName;
      const captcha_token = 'captcha_token_placeholder';

      // console.log(object)

      console.log('Tentative de connexion avec :', {
        email,
        password,
        appName,
        captcha_token,
      });

      // Appel du service d'authentification
      this.authService
        .login(email, password, appName, captcha_token)
        .subscribe({
          next: (res) => {
            console.log('Connexion reussie :', res);

            if (res.status === 422) {
              this.loading = false;
              // this.showNotification(res.message);
              this.message =
                res.message || 'Erreur lors de la réinitialisation.';
              console.log(res.message);
              console.log('Captcha invalide, réessayez');
            } else if (res.status === 401) {
              this.loading = false;
              // this.showNotification(res.message);
              this.message =
                res.message || 'Erreur lors de la réinitialisation.';
              // console.log("Captcha invalide, réessayez");
              console.log('Mot de passe incorrect');
            } else if (res.status === 403) {
              this.loading = false;
              this.success = false;
              // this.showNotification(res.message);
              this.message =
                res.message || 'Erreur lors de la réinitialisation.';
              // console.log("Captcha invalide, réessayez");
              console.log('Mot de passe incorrect');
            } else {
              this.success = false;
              this.loading = false;
              // this.showNotification(res.message);
              // this.message = res.message || 'Erreur lors de la réinitialisation.';
              // console.log("Captcha invalide, réessayez");
              this.authService.saveToken(res.token);
              // console.log("Utilisateur :", res);
              // Redirection après login réussi
              console.log('Login réussi, redirection vers la validation OTP');
              this.router.navigate(['/valider-otp-login']); // adapte le chemin
            }
          },

          error: (err) => {
            console.error('Erreur lors de la connexion :', err);
          },
        });
    } else {
      alert('Formulaire invalide !! Veuillez remplir tous les champs.');
      console.log('Formulaire invalide');
      this.message = 'Veuillez remplir tous les champs.';
      this.success = false;
      return;
    }
  }
}
