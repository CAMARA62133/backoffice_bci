import {Routes} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {Page404NotFoundComponent} from './components/shared/errors/page404-not-found/page404-not-found.component';
import {Page404Component} from './components/shared/errors/page404/page404.component';
import {AlertesComponent} from './pages/alertes/alertes.component';
import {ConfigUserDefautNotifsComponent} from './pages/config-user-defaut-notifs/config-user-defaut-notifs.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FormNouveauPasswordComponent} from './pages/auth/form-nouveau-password/form-nouveau-password.component';
import {LoadingPageComponent} from './pages/auth/loading-page/loading-page.component';
import {
  LoadingVerifyEmailPageComponent
} from './pages/auth/loading-verify-email-page/loading-verify-email-page.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {ReinitialiserPasswordComponent} from './pages/auth/reinitialiser-password/reinitialiser-password.component';
import {ResetOrgPasswordComponent} from './pages/auth/reset-org-password/reset-org-password.component';
import {
  ValidateOtpAfterVerifiedEmailComponent
} from './pages/auth/validate-otp-after-verified-email/validate-otp-after-verified-email.component';
import {ValiderOtpAfterLoginComponent} from './pages/auth/valider-otp-after-login/valider-otp-after-login.component';
import {LogOrgComponent} from './pages/logs/log-org/log-org.component';
import {LogUserComponent} from './pages/logs/log-user/log-user.component';
import {MesNotificationsComponent} from './pages/mes-notifications/mes-notifications.component';
import {ModifierMesInfosComponent} from './pages/modifier-mes-infos/modifier-mes-infos.component';
import {NotificationsComponent} from './pages/notifications/notifications.component';
import {OrganisationsComponent} from './pages/organisations/organisations.component';
import {OtpAfterChangeInfoComponent} from './pages/auth/otp-after-change-info/otp-after-change-info.component';
import {UtilisteurComponent} from './pages/utilisateurs/utilisteur.component';
import {
  VerifyemailAfterchangePageComponent
} from './pages/auth/verifyemail-afterchange-page/verifyemail-afterchange-page.component';
import {AuthGuard} from './guards/auth/auth-guard.guard';
import {DemandesComponent} from './pages/demande-souscription/demandes/demandes.component';
import {EntreprisesComponent} from './pages/demande-souscription/entreprises/entreprises.component';
import {MyDiagramComponentComponent} from './components/my-diagram-component/my-diagram-component.component';
import {TableauDeBordComponent} from './pages/agent-conformite/tableau-de-bord/tableau-de-bord.component';
import {
  FicheDetailsDemandesComponent
} from './pages/demande-souscription/fiche-details-demandes/fiche-details-demandes.component';
import {
  FicheDetailsEntreprisesComponent
} from './pages/demande-souscription/fiche-details-entreprises/fiche-details-entreprises.component';
import {TestDashboardComponent} from './pages/test-dashboard/test-dashboard.component';

export const routes: Routes = [

  // ============ AUTH ROUTES ================
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
    path: 'test-diagram',
    title: 'BCI - Online | Test Diagram',
    component: MyDiagramComponentComponent,
  },

  // ==================== ADMIN section ====================
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
        path: 'logs-utilisateurs',
        title: 'BCI - Online | Logs des Utilisateurs',
        component: LogUserComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'logs-organisations',
        title: 'BCI - Online | Logs des Organisations',
        component: LogOrgComponent,
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
      },

      {
        path: 'liste-demandes',
        title: 'BCI - Online | Liste des demandes de souscription',
        component: DemandesComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'fiche-demande',
        title: 'BCI - Online | Fiches détails demandes de souscription',
        component: FicheDetailsDemandesComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'liste-entreprises',
        title: 'BCI - Online | Liste des entreprises',
        component: EntreprisesComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'fiche-entreprise',
        title: 'BCI - Online | Fiches détails des entreprises',
        component: FicheDetailsEntreprisesComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'tableau-de-bord',
        title: 'BCI - Online | Tableau de bord Agent de conformité',
        component: TableauDeBordComponent,
        canActivate: [AuthGuard],
      },

      // ========================= Organisation sections =========================
      {
        path: 'organisation-dashboard',
        title: 'BCI - Online | Tableau de bord Organisation',
        component: TestDashboardComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'organisation-dashboard',
        title: 'BCI - Online | Tableau de bord Organisation',
        component: TestDashboardComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  // ==================== AGENT CONFORMITE section ====================
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   // data: {role: ['']},
  //   children: [
  //     {
  //       path: 'dashboard',
  //       title: 'BCI - Online | Tableau de bord Agent de comformité',
  //       component: TableauDeBordComponent,
  //     },
  //
  //     // ====== Redirection automatique sur le dashboard
  //     {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  //   ],
  // },
  //
  //
  // // ==================== TEST section ====================
  // {
  //   path: 'test',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   // data: {role: ['']},
  //   children: [
  //     {
  //       path: 'dashboard',
  //       title: 'BCI - Online | Tableau de bord Test',
  //       component: TestDashboardComponent,
  //     },
  //
  //     // ====== Redirection automatique sur le dashboard
  //     {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  //   ],
  // },

  // =================== 404 =====================
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
