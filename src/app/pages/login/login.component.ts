import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environnements/environnement';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar-otp',
    });
  }

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

            // Si la réponse est un succès (200), on sauvegarde le token et on redirige
            if (res?.status && res.status === 200) {
              this.loading = false;
              this.success = true;
              this.authService.saveToken(res.token);
              console.log('Login réussi, redirection vers la validation OTP');
              this.router.navigate(['/valider-otp-login']);
            } else {
              this.loading = false;
              this.success = false;
              this.showNotification(res.message);
              this.router.navigate(['/login']);
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

  passwordVisible = false; // false = masque, true = visible
  // bascule visibilité
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
