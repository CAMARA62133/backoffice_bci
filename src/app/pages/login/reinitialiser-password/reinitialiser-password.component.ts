import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/authService/auth.service';

@Component({
  selector: 'app-reinitialiser-password',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
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
    private toastr: ToastrService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const {email} = this.forgotPasswordForm.value;

    // Appel au service d'authentification pour réinitialiser le mot de passe
    this.authService.requestResetPassword(email).subscribe({
      next: (res) => {
        this.success = true;
        this.loading = false;

        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });

        // Si ok rediriger sur le login
        this.router.navigate(['/login']);
        console.log(res);
      },

      error: (err) => {
        this.loading = false;
        this.success = false;
        this.toastr.error(err?.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log({err});
      },
    });
  }
}
