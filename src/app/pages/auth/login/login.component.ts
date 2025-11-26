import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgxCaptchaModule} from 'ngx-captcha';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environnements/environnement';
import {AuthService} from '../../../services/authService/auth.service';
import {isValid} from '../../../utils/form-helpers';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterLink,
    NgxCaptchaModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Formulaire de connexion
  loginForm!: FormGroup;

  // Variables pour la gestion des messages et du chargement
  message: any = '';
  success: boolean = false;
  loading: boolean = false;

  passwordVisible = false; // false = masque, true = visible

  // siteKey: string = '6LfNstgrAAAAAHnIIdUeCuDyv7IBMWfEOh2uzWhF';
  siteKey: string = '6LfVN9UrAAAAABnkhkRbaBBFeT5P5I7SO9OPXBVp';
  isRecaptchaChecked = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  // Lifecycle hook appelé à l'initialisation du composant
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });

    // Surveille les changements du recaptcha
    this.loginForm.get('recaptcha')?.valueChanges.subscribe((value) => {
      this.isRecaptchaChecked = !!value; // true si coché, false sinon
      console.log('Recaptcha checked:', this.isRecaptchaChecked);
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
      const captcha_token = this.loginForm.get('recaptcha')?.value;

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

            // Si la réponse est un succès, on sauvegarde le token et on redirige
            this.loading = false;
            this.success = true;

            localStorage.setItem('loginEmail', email);
            this.router.navigate(['/valider-otp-login']);

            console.log('Login réussi, redirection vers la validation OTP');
          },

          error: (err) => {
            this.router.navigate(['/login']);
            console.error('Erreur lors de la connexion :', err);
            this.toastr.error('Erreur lors de la connexion', '', {
              positionClass: 'toast-custom-center',
            });
          },
        });
    } else {
      this.toastr.error(
        'Formulaire invalide !! Veuillez remplir tous les champs.',
        '',
        {
          positionClass: 'toast-custom-center',
        }
      );
      console.log('Formulaire invalide');
    }
  }

  // bascule visibilité
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected readonly isValid = isValid;
}
