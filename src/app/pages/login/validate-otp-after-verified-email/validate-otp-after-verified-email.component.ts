import { NgIf } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/authService/auth.service';
import { OrgOtpLoginService } from '../../../services/orgOtpLogin/org-otp-login.service';

@Component({
  selector: 'app-validate-otp-after-verified-email',
  imports: [NgIf, FormsModule],
  templateUrl: './validate-otp-after-verified-email.component.html',
  styleUrl: './validate-otp-after-verified-email.component.css',
})
export class ValidateOtpAfterVerifiedEmailComponent {
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;

  otpValues: string[] = ['', '', '', ''];
  isLoading = false;
  errorMessage = '';

  // Controles des modals
  showModalSuccess: boolean = false;
  showModalError: boolean = false;
  showModalOTP_expire: boolean = false;

  constructor(
    private otpService: OrgOtpLoginService,
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
  email = localStorage.getItem('validateEmailUrlEmail');

  // renvoie de l'OTP
  reEnvoiOtp() {
    this.isLoadingReEnvoi = true;
    this.otpService.orgReenvoieOtp().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.isLoadingReEnvoi = false;
          this.otpValues = ['', '', '', ''];

          this.toastr.success(response.message, '', {
            positionClass: 'toast-custom-center',
          });
        }
        console.log('DEBUG: OTP Renvoyez avec success !');
        console.log('reponse api : ', response);
      },

      error: (err) => {
        this.isLoadingReEnvoi = false;
        console.log(err);

        this.toastr.error(err, '', {
          positionClass: 'toast-custom-center',
        });
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
    console.log('Verification');

    this.otpService.orgVerifierOtp(otp).subscribe({
      next: (response) => {
        console.log('all responses : ', response);

        this.isLoading = false;
        if (response.status === 200) {
          this.toastr.success('OTP vérifier avec succès', '', {
            positionClass: 'toast-custom-center',
          });
          this.router.navigate(['/nouveau-mot-de-passe']);
          console.log(response);
        } else {
          this.toastr.error(response.message, '', {
            positionClass: 'toast-custom-center',
          });
          console.log(response);
        }
      },

      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log('erreur : ', err);
      },
    });
  }

  resetOTPForm() {
    this.otpValues = ['', '', '', ''];
  }

  closeModalOtpExpire() {
    this.showModalOTP_expire = false;
  }
  closeModalError() {
    this.showModalError = false;
  }
}
