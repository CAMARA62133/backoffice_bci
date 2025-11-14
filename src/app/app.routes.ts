import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Page404NotFoundComponent } from './components/shared/errors/page404-not-found/page404-not-found.component';
import { Page404Component } from './components/shared/errors/page404/page404.component';
import { AlertesComponent } from './pages/alertes/alertes.component';
import { ConfigUserDefautNotifsComponent } from './pages/config-user-defaut-notifs/config-user-defaut-notifs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormNouveauPasswordComponent } from './pages/login/form-nouveau-password/form-nouveau-password.component';
import { LoadingPageComponent } from './pages/login/loading-page/loading-page.component';
import { LoadingVerifyEmailPageComponent } from './pages/login/loading-verify-email-page/loading-verify-email-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ReinitialiserPasswordComponent } from './pages/login/reinitialiser-password/reinitialiser-password.component';
import { ResetOrgPasswordComponent } from './pages/login/reset-org-password/reset-org-password.component';
import { ValidateOtpAfterVerifiedEmailComponent } from './pages/login/validate-otp-after-verified-email/validate-otp-after-verified-email.component';
import { ValiderOtpAfterLoginComponent } from './pages/login/valider-otp-after-login/valider-otp-after-login.component';
import { MesNotificationsComponent } from './pages/mes-notifications/mes-notifications.component';
import { ModifierMesInfosComponent } from './pages/modifier-mes-infos/modifier-mes-infos.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { OrganisationsComponent } from './pages/organisations/organisations.component';
import { OtpAfterChangeInfoComponent } from './pages/otp-after-change-info/otp-after-change-info.component';
import { UtilisteurComponent } from './pages/utilisateurs/utilisteur/utilisteur.component';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { VerifyemailAfterchangePageComponent } from './pages/verifyemail-afterchange-page/verifyemail-afterchange-page.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

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
    path: 'validate-email2',
    title: "BCI - Online | Validation de l'email",
    component: VerifyemailAfterchangePageComponent,
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
    path: 'org-nouveau-mot-de-passe',
    title: 'BCI - Online | Nouveau mot de passe',
    component: ResetOrgPasswordComponent,
  },

  {
    path: 'not-found',
    title: 'BCI - Online | Page non trouvée',
    component: Page404NotFoundComponent,
  },

  {
    path: 'lien-expire',
    title: 'BCI - Online | Lien expiré',
    component: Page404Component,
  },

  {
    path: 'valider-otp',
    title: 'BCI - Online | Validation du code OTP de modification',
    component: OtpAfterChangeInfoComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
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
        // data: { exclude: [10] },
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

      {
        path: 'configuration-notif-user-defaut',
        title: 'BCI - Online | Configuration Notification par défaut',
        component: ConfigUserDefautNotifsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'mes-notifications',
        title: 'BCI - Online | Mes notifications',
        component: MesNotificationsComponent,
        canActivate: [AuthGuard],
        // data: { exclude: [10] },
      },
    ],
  },

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
