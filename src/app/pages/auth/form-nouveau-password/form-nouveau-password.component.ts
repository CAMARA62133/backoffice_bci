import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { FormNouveauPasswordService } from '../../../services/auth/formNouveauPassword/form-nouveau-password.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-form-nouveau-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-nouveau-password.component.html',
  styleUrl: './form-nouveau-password.component.css',
})
export class FormNouveauPasswordComponent implements OnInit {
  form!: FormGroup;
  message = '';
  success = false;
  loading = false;

  showPassword = false; // :œil: pour afficher/masquer mot de passe
  showConfirmPassword = false;
  public notification = inject(NotificationService);
  constructor(
    private fb: FormBuilder,
    private formNouveauPasswordService: FormNouveauPasswordService,
    private router: Router,
    // private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nouveauPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmerPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      // this.message = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const { nouveauPassword, confirmerPassword } = this.form?.value;
    // Vérifier si les deux mots de passe correspondent
    if (nouveauPassword !== confirmerPassword) {
      this.form.get('confirmerPassword')?.setErrors({ mismatch: true });
      return;
    }

    this.loading = true;

    // Appel au service pour vérifier le token et réinitialiser le mot de passe
    this.formNouveauPasswordService.verifierToken(nouveauPassword).subscribe({
      next: (res) => {
        console.log('Réponse API :', res);

        this.success = true;
        this.loading = false;
        this.notification.success(res?.message);
        // this.toastr.success(res?.message, '', {
        //   positionClass: 'toast-custom-center',
        // });

        // ✅ Nettoyage du localStorage
        localStorage.removeItem('urlEmail');
        localStorage.removeItem('urlToken');

        // ✅ Redirection vers la page de connexion
        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.success = false;
        this.loading = false;
        this.message =
          err.error?.message || 'Erreur lors de la réinitialisation.';
        this.notification.error(this.message);
        // this.toastr.error(this.message, '', {
        //   positionClass: 'toast-custom-center',
        // });

        console.log("Réponse en cas d'erreur serveur :", {
          Message: this.message,
          Erreur: err,
        });
      },
    });
  }
}
