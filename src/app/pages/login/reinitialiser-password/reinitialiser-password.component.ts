import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-reinitialiser-password',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reinitialiser-password.component.html',
  styleUrl: './reinitialiser-password.component.css',
})
export class ReinitialiserPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading: boolean = false;
  message: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar-otp',
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.loading = true;

    const { email } = this.forgotPasswordForm.value;

    // Enregistrer l'email dans le localStorage
    localStorage.setItem('resetEmail', email);

    // Appel au service d'authentification pour réinitialiser le mot de passe
    this.authService.requestResetPassword(email).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.status && res.status === 200) {
          this.success = true;
          this.loading = false;
          this.message =
            "Un email de réinitialisation a été envoyé à l'adresse fournie. Veuillez vérifier votre boîte de réception. Si vous ne le voyez pas, vérifiez votre dossier de spam.";
        } else {
          this.message = res.message || 'Addresse email non reconnue.';
          this.success = false;
          this.loading = false;
          console.log("En cas d'erreur : ", res);
        }
      },

      error: (err) => {
        this.loading = false;
        this.success = false;
        this.message =
          err.error?.message ||
          'Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer.';
        console.log(this.success, this.message, this.loading);
      },
    });
  }
}
