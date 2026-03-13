import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/authService/auth.service';
import { OtpLoginServiceService } from '../../../services/auth/otpLogin/otp-login.service';
import { AuthService as NodeAuthService } from '../../../core/node/services/auth/auth.service';
import { InactivityServiceTsService } from '../../../services/auth/inactivity/inactivity.service';
import { NotificationService } from '../../../services/notification/notification.service';

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
  public notification = inject(NotificationService);
  constructor(
    private otpService: OtpLoginServiceService,
    private router: Router,
    private authService: AuthService,
    // private toastr: ToastrService,
    private nodeAuthService: NodeAuthService,
    private inactivityService: InactivityServiceTsService,
  ) {}

  ngOnInit() {
    this.loginEmail = localStorage.getItem('loginEmail');

    // this.nodeAuthService.login(this.loginEmail).subscribe({
    //   next: (res) => {
    //     console.log("res appel api node ", res)
    //   },
    //   error: (err) => {
    //     console.log("err appel api node ", err)
    //   }
    // })
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

        this.notification.error(err);
        // this.toastr.error(err, '', {
        //   positionClass: 'toast-custom-center',
        // });

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

    this.otpService.verifierOtp(otp, this.loginEmail).subscribe({
      next: (response) => {
        console.log('all respnse : ', response);
        this.isLoading = false;

        if (response?.status && response.status === 200) {
          // Sauvegarde dans AuthService et localStorage
          this.authService.setUserInfo(response.data);
          this.authService.setUserInfoConfig(response.config);
          // this.authService.saveToken(response.token);

          console.log('res : ', response);

          this.notification.success(response?.message);
          // this.toastr.success(response?.message, '', {
          //   positionClass: 'toast-custom-center',
          // });
          this.inactivityService.startWatching();

          // Redirection en fonction du role
          if (response?.data?.vcRoleName === 'Agent Conformité') {
            this.router.navigate(['/agent-dashboard']);
          } else if (
            response?.data?.vcRoleName === 'Administrateur Système (IT)'
          ) {
            this.router.navigate(['/org-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
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
        console.log({ err });
        this.notification.error(err?.message);
        // this.toastr.error(err?.message, '', {
        //   positionClass: 'toast-custom-center',
        // });
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
