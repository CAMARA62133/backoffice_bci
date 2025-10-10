import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/authService/auth.service';
import { OtpLoginServiceService } from '../../../services/otpLogin/otp-login.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-valider-otp-after-login',
  imports: [RouterLink, FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './valider-otp-after-login.component.html',
  styleUrls: ['./valider-otp-after-login.component.css'],
})
export class ValiderOtpAfterLoginComponent {
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;
  otpValues: string[] = ['', '', '', ''];
  isLoading = false;
  errorMessage = '';
  // Contrôle des modals
  showModalSuccess: boolean = false;
  showModalError: boolean = false;
  showModalOTP_expire: boolean = false;
  constructor(
    private otpService: OtpLoginServiceService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input.value;
    if (value.length === 1 && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    } else if (value.length === 0 && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  isOtpComplete(): boolean {
    return this.otpValues.every((value) => value.trim() !== '');
  }

  isLoadingReEnvoi: boolean = false;

  // message = '';
  reEnvoiOtp() {
    this.isLoadingReEnvoi = true;
    this.otpService.reenvoiOtp().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.isLoadingReEnvoi = false;
          this.otpValues = ['', '', '', ''];

          this.toastr.success(response.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log(response);
      },
      error: (err) => {
        this.isLoadingReEnvoi = false;
        console.log(err);
        this.toastr.success(err, '', {
          positionClass: 'toast-custom-center',
        });
      },
    });
  }

  submitOtp() {
    if (!this.isOtpComplete()) {
      this.errorMessage = 'Veuillez remplir tous les champs OTP.';
      return;
    }
    const otp = this.otpValues.join('');
    this.isLoading = true;
    this.errorMessage = '';
    this.otpService.verifierOtp(otp).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 200 && response.data) {
          // Sauvegarde dans AuthService et localStorage
          this.authService.setUserInfo(response.data);
          this.toastr.success('Connexion reussi avec success...', '', {
            positionClass: 'toast-custom-center',
          });
          this.router.navigate(['/dashboard']);
          console.log(response);

          // Ouvrir modal succès
          // this.showModalSuccess = true;
        } else if (response.status === 401) {
          this.toastr.error(response.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log({ err });
        this.toastr.error(err, '', {
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
