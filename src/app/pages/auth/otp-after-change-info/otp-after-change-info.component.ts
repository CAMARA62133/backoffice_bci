import {CommonModule} from '@angular/common';
import {Component, ElementRef, inject, QueryList, ViewChildren} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';
// import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/auth/authService/auth.service';
import {OtpAfterChangeInfoService} from '../../../services/auth/otp-after-change-info/otp-after-change-info.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-otp-after-change-info',
  imports: [RouterLink, FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './otp-after-change-info.component.html',
  styleUrl: './otp-after-change-info.component.css',
})
export class OtpAfterChangeInfoComponent {
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;
  otpValues: string[] = ['', '', '', ''];
  isLoading = false;
  errorMessage = '';

  // Contrôle des modals
  showModalSuccess: boolean = false;
  showModalError: boolean = false;
  showModalOTP_expire: boolean = false;

  loginEmail: string | null = '';
  userEmail: string | null = '';

  public notification= inject(NotificationService)
  constructor(
    private otpService: OtpAfterChangeInfoService,
    private router: Router,
    private authService: AuthService,
    // private toastr: ToastrService
  ) {
  }

  // A l'initialisation
  ngOnInit() {
    this.loginEmail = localStorage.getItem('loginEmail');
    this.userEmail = localStorage.getItem('userEmail');
  }

  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input.value;
    if (value.length === 1 && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    } else if (value.length === 0 && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }

    // soumettre le formulaire si otp valide
    if (this.isOtpComplete()) {
      setTimeout(() => {
        this.submitOtp();
      }, 200);
    }
  }

  isOtpComplete(): boolean {
    return this.otpValues.every((value) => value.trim() !== '');
  }

  ngAfterViewInit(): void {
    if (this.otpInputs && this.otpInputs.first) {
      setTimeout(() => {
        this.otpInputs.first.nativeElement.focus();
      }, 100);
    }
  }

  isLoadingReEnvoi: boolean = false;

  // message = '';
  reEnvoiOtp() {
    this.isLoadingReEnvoi = true;
    this.otpService.resentOTP(this.userEmail).subscribe({
      next: (response) => {
        this.isLoadingReEnvoi = false;

        this.otpValues = ['', '', '', ''];

        this.notification.success(response.message);
        // this.toastr.success(response.message, '', {
        //   positionClass: 'toast-custom-center',
        // });

        if (this.otpInputs && this.otpInputs.first) {
          setTimeout(() => {
            this.otpInputs.first.nativeElement.focus();
          }, 100);
        }
        console.log(response);
      },

      error: (err) => {
        this.isLoadingReEnvoi = false;
        console.log(err);

        this.notification.success(err);
        // this.toastr.success(err, '', {
        //   positionClass: 'toast-custom-center',
        // });

        this.otpValues = ['', '', '', ''];
        if (this.otpInputs && this.otpInputs.first) {
          setTimeout(() => {
            this.otpInputs.first.nativeElement.focus();
          }, 100);
        }
      },
    });
  }

  submitOtp() {
    if (this.isLoading) return;

    if (!this.isOtpComplete()) {
      this.errorMessage = 'Veuillez remplir tous les champs OTP.';
      return;
    }

    const otp = this.otpValues.join('');
    this.isLoading = true;
    this.errorMessage = '';

    console.log('params envoyer otp : ', otp);

    // Appel au service de verification de l'email
    this.otpService.verifyOTP(otp, this.userEmail).subscribe({
      next: (response) => {
        console.log('all respnse : ', response);

        this.isLoading = false;
        if (response?.status && response.status === 200) {
          // Sauvegarde dans AuthService et localStorage
          this.authService.setUserInfo(response.data);
          this.authService.setUserInfoConfig(response.config);
          this.authService.saveToken(response.token);

          console.log('res : ', response);

          this.notification.success('Numéro de téléphone vérifié avec succès');
          // this.toastr.success("Numéro de téléphone vérifié avec succès", '', {
          //   positionClass: 'toast-custom-center',
          // });
          this.router.navigate(['/login']);
          localStorage.removeItem('userEmail');
        } else {
          // Apres 3 tentatives on bloque l'utilisateur et on lui redirige sur la page de connexion
          if (response?.status === 405 || response?.status === '405') {
            this.router.navigate(['/login']);
          }

          this.notification.error(response.message);
          // this.toastr.error(response.message, '', {
          //   positionClass: 'toast-custom-center',
          // });
        }
        console.log(response);
      },
      error: (err) => {
        this.isLoading = false;
        console.log({err});
        this.notification.error(err?.message);
        // this.toastr.error(err?.message, '', {
        //   positionClass: 'toast-custom-center',
        // });
      },
    });
  }

  // Fermer le modal d'expiration d'OTP
  closeModalOtpExpire() {
    this.showModalOTP_expire = false;
  }

  // Fermer le modal d'erreur
  closeModalError() {
    this.showModalError = false;
  }
}
