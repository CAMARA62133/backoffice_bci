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
import { ROLES } from '../../../core/constants/roles.config';

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
  readonly ROLES = ROLES;
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

        if (response?.status === 200) {
          // Sauvegarde des infos
          this.authService.setUserInfo(response.data);
          this.authService.setUserInfoConfig(response.config);

          this.notification.success(response?.message);
          this.inactivityService.startWatching();

          // RÉCUPÉRATION DE L'ID (on s'assure que c'est une string pour matcher ton config)
          const roleId = response?.data?.iRoleID?.toString();

          // REDIRECTION BASÉE SUR L'ID
          switch (roleId) {
            case ROLES.AGENT_CONFORMITE:
              this.router.navigate(['/agent-dashboard']);
              break;

            case ROLES.ADMIN_SYSTEME_IT:
              this.router.navigate(['/org-dashboard']);
              break;

            case ROLES.TRADE_AGENT:
              this.router.navigate(['/agent-trade-dashboard']);
              break;
            case ROLES.DG:
            case ROLES.DGA:
              this.router.navigate(['/dg-dga-dashboard']);
              break;
            default:
              this.router.navigate(['/dashboard']);
              break;
          }
        } else {
          // Gestion du blocage (405)
          // Utilisation de == pour accepter "405" ou 405 sans se poser de questions
          if (response?.status == 405) {
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
