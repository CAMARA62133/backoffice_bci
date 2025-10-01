import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
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
          // this.showModalSuccessEnvoiOtp = true;
          this.showNotification(response.message);
          // this.message = response.message;
        }
        console.log(response);
      },
      error: (err) => {
        this.isLoadingReEnvoi = false;
        console.log(err);
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
          // console.log("Utilisateur connecté:", response.data);
          this.showNotification('Connexion reussi avec success...');
          this.router.navigate(['/dashboard']);
          console.log(response);

          // Ouvrir modal succès
          // this.showModalSuccess = true;
        }

        // else if (response.status === 401) {
        //   this.showModalOTP_expire = true;
        // }
      },
      error: (err) => {
        this.isLoading = false;
        this.showModalError = true;
        console.log({ err });
      },
    });
  }
  // closeModalSuccess() {
  //   this.showModalSuccess = false;
  //   this.router.navigate(['/dashboard']); // redirection après succès
  // }
  closeModalOtpExpire() {
    this.showModalOTP_expire = false;
  }
  closeModalError() {
    this.showModalError = false;
  }
}
