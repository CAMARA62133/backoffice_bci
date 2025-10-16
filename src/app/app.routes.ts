import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AlertesComponent } from './pages/alertes/alertes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormNouveauPasswordComponent } from './pages/login/form-nouveau-password/form-nouveau-password.component';
import { LoadingPageComponent } from './pages/login/loading-page/loading-page.component';
import { LoadingVerifyEmailPageComponent } from './pages/login/loading-verify-email-page/loading-verify-email-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ReinitialiserPasswordComponent } from './pages/login/reinitialiser-password/reinitialiser-password.component';
import { ValidateOtpAfterVerifiedEmailComponent } from './pages/login/validate-otp-after-verified-email/validate-otp-after-verified-email.component';
import { ValiderOtpAfterLoginComponent } from './pages/login/valider-otp-after-login/valider-otp-after-login.component';
import { ModifierMesInfosComponent } from './pages/modifier-mes-infos/modifier-mes-infos/modifier-mes-infos.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { OrganisationsComponent } from './pages/organisations/organisations.component';
import { UtilisteurComponent } from './pages/utilisateurs/utilisteur/utilisteur.component';
import { AuthGuard } from './services/guard/auth-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'BCI - Online | Connexion',
    component: LoginComponent,
  },

  {
    path: 'valider-otp-login',
    title: 'BCI - Online | Validation du code OTP',
    component: ValiderOtpAfterLoginComponent,
  },

  {
    path: 'validate-email',
    title: "BCI - Online | Validation de l'email",
    component: LoadingVerifyEmailPageComponent,
  },

  {
    path: 'valider-otp-email',
    title: 'BCI - Online | Validation du code OTP',
    component: ValidateOtpAfterVerifiedEmailComponent,
  },

  {
    path: 'reinitialiser-mot-de-passe',
    title: 'BCI - Online | Mot de passe oublié',
    component: ReinitialiserPasswordComponent,
  },

  {
    path: 'reset',
    title: 'BCI - Online | Réinitialisation du mot de passe',
    component: LoadingPageComponent,
  },
  {
    path: 'nouveau-mot-de-passe',
    title: 'BCI - Online | Nouveau mot de passe',
    component: FormNouveauPasswordComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        title: 'BCI - Online | Tableau de bord',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'organisations',
        title: 'BCI - Online | Listes des Organisations',
        component: OrganisationsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'utilisateurs',
        title: 'BCI - Online | Listes des Utilisateurs',
        component: UtilisteurComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'modifier-mon-profile',
        title: 'BCI - Online | Modifier mon Profile',
        component: ModifierMesInfosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'configuration-notifications',
        title: 'BCI - Online | Configuration Notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'configuration-alertes',
        title: 'BCI - Online | Configuration Alertes',
        component: AlertesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
