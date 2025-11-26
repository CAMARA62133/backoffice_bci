import {CommonModule} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/authService/auth.service';
import {OtpLoginServiceService} from '../../../services/otpLogin/otp-login.service';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-valider-otp-after-login',
  imports: [RouterLink, FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './valider-otp-after-login.component.html',
  styleUrls: ['./valider-otp-after-login.component.css'],
})
export class ValiderOtpAfterLoginComponent implements AfterViewInit, OnInit {
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;
  otpValues: string[] = ['', '', '', ''];
  isLoading = false;
  errorMessage = '';

  // Contrôle des modals
  showModalSuccess: boolean = false;
  showModalError: boolean = false;
  showModalOTP_expire: boolean = false;

  loginEmail: string | null = '';

  constructor(
    private otpService: OtpLoginServiceService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loginEmail = localStorage.getItem('loginEmail');
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
    this.otpService.reenvoiOtp(this.loginEmail).subscribe({
      next: (response) => {
        this.isLoadingReEnvoi = false;
        this.otpValues = ['', '', '', ''];

        this.toastr.success(response.message, '', {
          positionClass: 'toast-custom-center',
        });

        if (this.otpInputs && this.otpInputs.first) {
          setTimeout(() => {
            this.otpInputs.first.nativeElement.focus();
          }, 100);
        }

        console.log(response);
      },

      error: (err) => {
        this.isLoadingReEnvoi = false;

        this.toastr.error(err, '', {
          positionClass: 'toast-custom-center',
        });

        console.log(err);
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

    this.otpService.verifierOtp(otp, this.loginEmail).subscribe({
      next: (response) => {
        console.log('all respnse : ', response);

        this.isLoading = false;
        if (response?.status && response.status === 200) {
          // Sauvegarde dans AuthService et localStorage
          this.authService.setUserInfo(response.data);
          this.authService.setUserInfoConfig(response.config);
          this.authService.saveToken(response.token);

          console.log('res : ', response);

          this.toastr.success(response?.message, '', {
            positionClass: 'toast-custom-center',
          });
          this.router.navigate(['/dashboard']);
        } else {
          // Apres 3 tentatives on bloque l'utilisateur et on lui redirige sur la page de connexion
          if (response?.status === 405 || response?.status === '405') {
            this.router.navigate(['/login']);
          }

          this.toastr.error(response.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log(response);
      },
      error: (err) => {
        this.isLoading = false;
        console.log({err});
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
      },
    });
  }

  closeModalOtpExpire() {
    this.showModalOTP_expire = false;
  }

  closeModalError() {
    this.showModalError = false;
  }
}
