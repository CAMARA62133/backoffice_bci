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
import {AuthGuard} from './core/guards/auth/auth-guard.guard';
import {MyDiagramComponentComponent} from './components/my-diagram-component/my-diagram-component.component';

//  Organisation import components
import {OrgDashboardComponent} from './pages/orgs/org-dashboard/org-dashboard.component';
import {OrgListUtilisateurComponent} from './pages/orgs/org-list-utilisateur/org-list-utilisateur.component';
import {OrgFicheUtilisateurComponent} from './pages/orgs/org-fiche-utilisateur/org-fiche-utilisateur.component';
import {OrgListEntrepriseComponent} from './pages/orgs/org-list-entreprise/org-list-entreprise.component';
import {OrgFicheEntrepriseComponent} from './pages/orgs/org-fiche-entreprise/org-fiche-entreprise.component';
import {RepportingExportComponent} from './pages/orgs/repporting-export/repporting-export.component';
import {TransactionsOperationsComponent} from './pages/orgs/transactions-operations/transactions-operations.component';
import {AlertesSupervisionsComponent} from './pages/orgs/alertes-supervisions/alertes-supervisions.component';
import {AgentDashboardComponent} from './pages/agent-conformite/agent-dashboard/agent-dashboard.component';
import {
  AgentListeDemandesComponent
} from './pages/agent-conformite/agent-liste-demandes/agent-liste-demandes.component';
import {
  AgentFicheDemandesComponent
} from './pages/agent-conformite/agent-fiche-demandes/agent-fiche-demandes.component';
import {
  AgentListeEntrepriseComponent
} from './pages/agent-conformite/agent-liste-entreprise/agent-liste-entreprise.component';
import {
  AgentFicheEntrepriseComponent
} from './pages/agent-conformite/agent-fiche-entreprise/agent-fiche-entreprise.component';
import {EntreprisesComponent} from './pages/demande-souscription/entreprises/entreprises.component';
import {UnauthorizedComponent} from './pages/auth/unauthorized/unauthorized.component';
import {ChartTestComponent} from './pages/chart-test/chart-test.component';
import {nodeSessionGuard} from './core/node/guards/node-session/node-session.guard';

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

  {
    path: "unauthorized",
    title: 'BCI - Online | Unauthorized',
    component: UnauthorizedComponent,
  },

  // ==================== ADMIN section ====================
  {
    path: '',
    // loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
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
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },

      {
        path: 'test-chart',
        title: 'BCI - Online | Tableau de bord',
        component: ChartTestComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque", "Agent Conformité"]}
      },

      {
        path: 'organisations',
        title: 'BCI - Online | Listes des Organisations',
        component: OrganisationsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },
      {
        path: 'organisations/:id/liste-entreprise',
        title: "BCI - Online | Listes des entreprises de l'organisation",
        component: EntreprisesComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },

      {
        path: 'logs-utilisateurs',
        title: 'BCI - Online | Logs des Utilisateurs',
        component: LogUserComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },

      {
        path: 'logs-organisations',
        title: 'BCI - Online | Logs des Organisations',
        component: LogOrgComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },

      {
        path: 'utilisateurs',
        title: 'BCI - Online | Listes des Utilisateurs',
        component: UtilisteurComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },

      {
        path: 'modifier-mon-profile',
        title: 'BCI - Online | Modifier mon Profile',
        component: ModifierMesInfosComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque", "Agent Conformité", "Administrateur Système (IT)"]}
      },

      {
        path: 'configuration-notifications',
        title: 'BCI - Online | Configuration Notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", "Admin integrateur banque"]}
      },

      {
        path: 'configuration-alertes',
        title: 'BCI - Online | Configuration Alertes',
        component: AlertesComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", ""]}
      },

      {
        path: 'configuration-notif-user-defaut',
        title: 'BCI - Online | Configuration Notification par défaut',
        component: ConfigUserDefautNotifsComponent,
        canActivate: [AuthGuard],
        data: {roles: ['Admin integrateur', ""]}
      },

      {
        path: 'mes-notifications',
        title: 'BCI - Online | Mes notifications',
        component: MesNotificationsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Admin integrateur", ""]}
      },

      // =========== Organisations =================
      {
        path: 'org-dashboard',
        title: 'BCI - Online | Tableau de bord Organisation',
        component: OrgDashboardComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'org-utilisateur',
        title: 'BCI - Online | Liste des utilisateurs',
        component: UtilisteurComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'org-utilisateur/:id',
        title: 'BCI - Online | Liste des utilisateurs',
        component: OrgFicheUtilisateurComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'org-entreprise',
        title: 'BCI - Online | Liste des entreprises',
        component: OrgListEntrepriseComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'org-entreprise/:id',
        title: 'BCI - Online | Fiche des entreprises',
        component: OrgFicheEntrepriseComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'repporting-export',
        title: 'BCI - Online | Repportings et Exports',
        component: RepportingExportComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'transactions-operations',
        title: 'BCI - Online | Transactions et Operations',
        component: TransactionsOperationsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      {
        path: 'alertes-supervision',
        title: 'BCI - Online | Alertes et supervisions',
        component: AlertesSupervisionsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Administrateur Système (IT)"]}
      },

      // ========== Agent de conformite ==================
      {
        path: "agent-dashboard",
        title: 'BCI - Online | Tableau de bord Agent',
        component: AgentDashboardComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Agent Conformité"]}
      },

      {
        path: "agent-demandes",
        title: 'BCI - Online | Liste des demandes de souscriptions',
        component: AgentListeDemandesComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Agent Conformité"]}
      },

      {
        path: "agent-demandes/:id",
        title: 'BCI - Online | Fiche demandes de souscriptions',
        component: AgentFicheDemandesComponent,
        canActivate: [AuthGuard, nodeSessionGuard],
        data: {roles: ["Agent Conformité"]}
      },

      {
        path: "agent-entreprise",
        title: 'BCI - Online | Liste des entreprises',
        component: AgentListeEntrepriseComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Agent Conformité"]}
      },

      {
        path: "agent-entreprise/:id",
        title: 'BCI - Online | Fiche entreprise',
        component: AgentFicheEntrepriseComponent,
        canActivate: [AuthGuard],
        data: {roles: ["Agent Conformité"]}
      },
    ],
  },


  // =================== 404 =====================
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
