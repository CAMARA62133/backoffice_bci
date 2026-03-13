import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgxCaptchaModule} from 'ngx-captcha';
// import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environnements/environnement';
import {AuthService} from '../../../services/auth/authService/auth.service';
import {isValid} from '../../../core/utils/form-helpers';
import { NotificationService } from '../../../services/notification/notification.service';

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
  public notification = inject(NotificationService);
  // Variables pour la gestion des messages et du chargement
  message: any = '';
  success: boolean = false;
  loading: boolean = false;

  passwordVisible = false; // false = masque, true = visible

  // siteKey: string = '6LfNstgrAAAAAHnIIdUeCuDyv7IBMWfEOh2uzWhF';
  siteKey: string = '6LfVN9UrAAAAABnkhkRbaBBFeT5P5I7SO9OPXBVp';
  isRecaptchaChecked = false;

  user: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastr: ToastrService
  ) {}

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

      // 1️⃣ Charger le CSRF avant login (obligatoire)
      this.authService.getCsrfCookie().subscribe({
        next: () => {
          this.loading = false;

          // 2️⃣ POST login
          this.authService
            .loginTest(email, password, captcha_token, appName)
            .subscribe({
              next: (res) => {
                // Si la connexion reussi avec code 200
                if (res.status === 200) {
                  console.log('Statut login :', res.status);
                  console.log(
                    'Cookie après login :',
                    this.authService.getCookieValue('bci_banking_session'),
                  );

                  // Si la réponse est un succès, on sauvegarde le token et on redirige
                  this.loading = false;
                  this.success = true;

                  localStorage.setItem('loginEmail', email);
                  this.router.navigate(['/valider-otp-login']);

                  console.log('Connexion reussie :', res);
                  console.log(
                    'Login réussi, redirection vers la validation OTP',
                  );
                } else {
                  this.notification.error(res?.message);
                  // this.toastr.error(res?.message, '', {
                  //   positionClass: 'toast-custom-center',
                  // });
                  this.router.navigate(['/login']);
                  console.log('Erreur connexion dans "next" : ', res);
                }
              },

              error: (err) => {
                this.router.navigate(['/login']);
                console.error(
                  'Erreur lors de la connexion dans le "error" :',
                  err,
                );
                // this.toastr.error(err?.error?.message, '', {positionClass: 'toast-custom-center'});
                this.notification.error('Une erreur est survenue');
                // this.toastr.error("Une erreur est survenue", '', {positionClass: 'toast-custom-center'});
                this.loading = false;
              },
            });
        },

        error: () => {
          this.message = 'Erreur lors du chargement du cookie CSRF';
          this.loading = false;
        },
      });
      // Appel du service d'authentification
      // this.authService
      //   .login(email, password, appName, captcha_token)
      //   .subscribe({
      //     next: (res) => {
      //       if (res?.status && res?.status === 200) {
      //         // Si la réponse est un succès, on sauvegarde le token et on redirige
      //         this.loading = false;
      //         this.success = true;
      //
      //         localStorage.setItem('loginEmail', email);
      //         this.router.navigate(['/valider-otp-login']);
      //
      //         console.log('Connexion reussie :', res);
      //         console.log('Login réussi, redirection vers la validation OTP');
      //       } else {
      //         this.toastr.error(res?.message, '', {
      //           positionClass: 'toast-custom-center',
      //         });
      //         this.router.navigate(['/login']);
      //         console.log('Erreur connexion : ', res);
      //       }
      //     },
      //
      //     error: (err) => {
      //       this.router.navigate(['/login']);
      //       console.error('Erreur lors de la connexion :', err);
      //       this.toastr.error('Erreur lors de la connexion', '', {
      //         positionClass: 'toast-custom-center',
      //       });
      //     },
      //   });
    } else {
      this.notification.error(
        'Formulaire invalide !! Veuillez remplir tous les champs.',
  
      );
      // this.toastr.error(
      //   'Formulaire invalide !! Veuillez remplir tous les champs.',
      //   '',
      //   {
      //     positionClass: 'toast-custom-center',
      //   },
      // );
      console.log('Formulaire invalide');
      this.loading = false;
    }
  }

  // onLogin() {
  //   this.loading = true;
  //
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.get('email')?.value;
  //     const password = this.loginForm.get('password')?.value;
  //     const appName = environment.appName;
  //     const captcha_token = this.loginForm.get('recaptcha')?.value;
  //
  //     console.log('Tentative de connexion avec :', {
  //       email,
  //       password,
  //       appName,
  //       captcha_token,
  //     });
  //
  //     // 1️⃣ Charger le CSRF avant login (obligatoire)
  //     this.authService.getCsrfCookie().subscribe({
  //       next: () => {
  //
  //         // 2️⃣ POST login
  //         this.authService.loginTest(email, password, captcha_token, appName).subscribe({
  //           next: (res) => {
  //             this.message = res.message;
  //
  //             if (res.status === 200) {
  //               console.log('Statut login :', res.status);
  //               console.log('Cookie après login :', this.authService.getCookieValue('bci_banking_session'));
  //
  //               // 3️⃣ Appel direct /api/user (NE JAMAIS rappeler csrf-cookie ici)
  //               this.authService.recupUserInfo().subscribe({
  //                 next: (data) => {
  //                   console.log('User:', data.user);
  //                   this.user = data.user;
  //                   this.loading = false;
  //                 },
  //
  //                 error: (err) => {
  //                   console.log('User API error:', err);
  //                   this.user = null;
  //                   this.loading = false;
  //                 }
  //               });
  //
  //             } else {
  //               this.user = null;
  //               this.loading = false;
  //             }
  //           },
  //
  //           error: (err) => {
  //             this.message = err.error?.message ?? 'Erreur login';
  //             this.user = null;
  //             this.loading = false;
  //           }
  //         })
  //       },
  //
  //       error: () => {
  //         this.message = 'Erreur lors du chargement du cookie CSRF';
  //         this.loading = false;
  //       }
  //     })
  //   }
  // }

  // bascule visibilité
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected readonly isValid = isValid;
}
