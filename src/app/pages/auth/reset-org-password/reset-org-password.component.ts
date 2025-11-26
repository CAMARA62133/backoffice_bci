import {NgClass, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OrganisationsService} from '../../../services/organisations/organisations.service';

@Component({
  selector: 'app-reset-org-password',
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './reset-org-password.component.html',
  styleUrl: './reset-org-password.component.css',
})
export class ResetOrgPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private orgService: OrganisationsService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {validators: this.passwordsMatchValidator}
    );
  }

  /** Vérifie si un champ est invalide */
  isInvalid(controlName: string): boolean {
    const control = this.resetPasswordForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  /** Vérifie si un champ est valide */
  isValid(controlName: string): boolean {
    const control = this.resetPasswordForm.get(controlName);
    return !!(control && control.valid && (control.touched || control.dirty));
  }

  /** Retourne le message d'erreur selon le validateur */
  getErrorMessage(controlName: string): string | null {
    const control = this.resetPasswordForm.get(controlName);
    if (!control) return null;

    if (control.hasError('required')) return 'Ce champ est obligatoire.';
    if (control.hasError('minlength'))
      return `Le mot de passe doit contenir au moins ${control.errors?.['minlength'].requiredLength} caractères.`;
    if (this.resetPasswordForm.hasError('passwordMismatch'))
      return 'Les mots de passe ne correspondent pas.';

    return null;
  }

  /** Validateur pour comparer les deux mots de passe */
  passwordsMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return newPass && confirm && newPass !== confirm
      ? {passwordMismatch: true}
      : null;
  }

  /** Soumission du formulaire */
  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const {newPassword} = this.resetPasswordForm.value;
    this.loading = true;

    this.orgService.resetPasswordOrganisation(newPassword).subscribe({
      next: (res) => {
        this.loading = false;

        this.toastr.success(res?.message, '', {
          positionClass: 'toast-custom-center',
        });

        this.router.navigate(['/login']);
        console.log({res});
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.message, '', {
          positionClass: 'toast-custom-center',
        });
        console.log({err});
      },
    });
  }
}
