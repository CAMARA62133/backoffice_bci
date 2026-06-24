import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MyDiagramComponentComponent } from './components/my-diagram-component/my-diagram-component.component';
import { Page404NotFoundComponent } from './components/shared/errors/page404-not-found/page404-not-found.component';
import { Page404Component } from './components/shared/errors/page404/page404.component';
import { AuthGuard } from './core/guards/auth/auth-guard.guard';
import { AlertesComponent } from './pages/alertes/alertes.component';
import { FormNouveauPasswordComponent } from './pages/auth/form-nouveau-password/form-nouveau-password.component';
import { LoadingPageComponent } from './pages/auth/loading-page/loading-page.component';
import { LoadingVerifyEmailPageComponent } from './pages/auth/loading-verify-email-page/loading-verify-email-page.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { OtpAfterChangeInfoComponent } from './pages/auth/otp-after-change-info/otp-after-change-info.component';
import { ReinitialiserPasswordComponent } from './pages/auth/reinitialiser-password/reinitialiser-password.component';
import { ResetOrgPasswordComponent } from './pages/auth/reset-org-password/reset-org-password.component';
import { ValidateOtpAfterVerifiedEmailComponent } from './pages/auth/validate-otp-after-verified-email/validate-otp-after-verified-email.component';
import { ValiderOtpAfterLoginComponent } from './pages/auth/valider-otp-after-login/valider-otp-after-login.component';
import { VerifyemailAfterchangePageComponent } from './pages/auth/verifyemail-afterchange-page/verifyemail-afterchange-page.component';
import { ConfigUserDefautNotifsComponent } from './pages/config-user-defaut-notifs/config-user-defaut-notifs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogOrgComponent } from './pages/logs/log-org/log-org.component';
import { LogUserComponent } from './pages/logs/log-user/log-user.component';
import { MesNotificationsComponent } from './pages/mes-notifications/mes-notifications.component';
import { ModifierMesInfosComponent } from './pages/modifier-mes-infos/modifier-mes-infos.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { OrganisationsComponent } from './pages/organisations/organisations.component';
import { UtilisteurComponent } from './pages/utilisateurs/utilisteur.component';

//  Organisation import components
import { nodeSessionGuard } from './core/node/guards/node-session/node-session.guard';
import { AgentDashboardComponent } from './pages/agent-conformite/agent-dashboard/agent-dashboard.component';
import { AgentFicheDemandesComponent } from './pages/agent-conformite/agent-fiche-demandes/agent-fiche-demandes.component';
import { AgentFicheEntrepriseComponent } from './pages/agent-conformite/agent-fiche-entreprise/agent-fiche-entreprise.component';
import { AgentListeDemandesComponent } from './pages/agent-conformite/agent-liste-demandes/agent-liste-demandes.component';
import { AgentListeEntrepriseComponent } from './pages/agent-conformite/agent-liste-entreprise/agent-liste-entreprise.component';
import { FacturiesComponent } from './pages/agent-conformite/facturies/facturies.component';
import { UnauthorizedComponent } from './pages/auth/unauthorized/unauthorized.component';
import { EntreprisesComponent } from './pages/demande-souscription/entreprises/entreprises.component';
import { AlertesSupervisionsComponent } from './pages/orgs/alertes-supervisions/alertes-supervisions.component';
import { BeneficiaireComponent } from './pages/orgs/beneficiaire/beneficiaire.component';
import { OrgDashboardComponent } from './pages/orgs/org-dashboard/org-dashboard.component';
import { OrgFicheEntrepriseComponent } from './pages/orgs/org-fiche-entreprise/org-fiche-entreprise.component';
import { OrgFicheUtilisateurComponent } from './pages/orgs/org-fiche-utilisateur/org-fiche-utilisateur.component';
import { OrgListEntrepriseComponent } from './pages/orgs/org-list-entreprise/org-list-entreprise.component';
import { RepportingExportComponent } from './pages/orgs/repporting-export/repporting-export.component';
import { TransactionsOperationsComponent } from './pages/orgs/transactions-operations/transactions-operations.component';
import { CreateEntrepriseComponent } from './pages/agent-conformite/create-entreprise/create-entreprise.component';
import { MobileOperatorComponent } from './pages/agent-conformite/mobile-operator/mobile-operator/mobile-operator.component';
import { HistoriqueTransactionComponent } from './pages/admin-integrateur/historique-transaction/historique-transaction.component';
import { TransactionInternationalComponent } from './pages/admin-integrateur/transaction-international/transaction-international.component';
import { SouscriptionClientComponent } from './pages/admin-integrateur/souscription-client/souscription-client.component';
import { AgentTradeDashboardComponent } from './pages/agent-trade/agent-trade-dashboard/agent-trade-dashboard.component';
import { TransactionMultipleComponent } from './pages/transaction-multiples/transaction-multiple/transaction-multiple.component';
import { DetailTransactionMultipleComponent } from './pages/transaction-multiples/detail-transaction-multiple/detail-transaction-multiple.component';

import { TransactionSansDerogationComponent } from './pages/transaction-internationnales/transaction-sans-derogation/transaction-sans-derogation.component';
import { TransactionDetailComponent } from './pages/transaction-internationnales/transaction-detail/transaction-detail.component';

import { ROLES } from './core/constants/roles.config';
import { RoleGuard } from './core/guards/role/role.guard';
import { DgDgaDashboardComponent } from './pages/dg-dga/dg-dga-dashboard/dg-dga-dashboard.component';
import { TransactionParDerogationComponent } from './pages/transaction-internationnales/transaction-par-derogation/transaction-par-derogation.component';
import { HistoriqueTransactionInternationnComponent } from './pages/transaction-internationnales/historique-transaction-internationnale/historique-transaction-internationnale.component';

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
    path: 'unauthorized',
    title: 'BCI - Online | Unauthorized',
    component: UnauthorizedComponent,
  },

  // ==================== SECTION PRIVÉE (LAYOUT) ====================
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      // --- ADMIN INTEGRATEUR ---
      {
        path: 'dashboard',
        title: 'BCI - Online | Tableau de bord',
        component: DashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.ADMIN_INTEGRATEUR, ROLES.ADMIN_INTEGRATEUR_BANQUE],
        },
      },
      {
        path: 'dg-dga-dashboard',
        title: 'BCI - Online | Tableau de bord',
        component: DgDgaDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.DG, ROLES.DGA],
        },
      },
      {
        path: 'organisations',
        title: 'BCI - Online | Listes des Organisations',
        component: OrganisationsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'organisations/:id/liste-entreprise',
        title: "BCI - Online | Listes des entreprises de l'organisation",
        component: EntreprisesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'historique-transaction',
        title: 'BCI - Online | Historique des transactions',
        component: HistoriqueTransactionComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'transaction-internationale',
        title: 'BCI - Online | Historique des transactions internationales',
        component: TransactionInternationalComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'detail-transaction-multiple/:id',
        title: 'BCI - Détail transaction multiple',
        component: DetailTransactionMultipleComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'transaction-multiple',
        title: 'BCI - Online | Transactions multiples',
        component: TransactionMultipleComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'souscription-client',
        title: 'BCI - Online | Souscription des clients',
        component: SouscriptionClientComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.ADMIN_INTEGRATEUR, ROLES.ADMIN_INTEGRATEUR_BANQUE],
        },
      },
      {
        path: 'logs-utilisateurs',
        title: 'BCI - Online | Logs des Utilisateurs',
        component: LogUserComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.ADMIN_INTEGRATEUR, ROLES.ADMIN_INTEGRATEUR_BANQUE],
        },
      },
      {
        path: 'logs-organisations',
        title: 'BCI - Online | Logs des Organisations',
        component: LogOrgComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.ADMIN_INTEGRATEUR, ROLES.ADMIN_INTEGRATEUR_BANQUE],
        },
      },
      {
        path: 'utilisateurs',
        title: 'BCI - Online | Listes des Utilisateurs',
        component: UtilisteurComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.ADMIN_INTEGRATEUR, ROLES.ADMIN_INTEGRATEUR_BANQUE],
        },
      },
      {
        path: 'configuration-notifications',
        title: 'BCI - Online | Configuration Notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [ROLES.ADMIN_INTEGRATEUR, ROLES.ADMIN_INTEGRATEUR_BANQUE],
        },
      },

      // --- PROFIL (MULTI-ROLES) ---
      {
        path: 'modifier-mon-profile',
        title: 'BCI - Online | Modifier mon Profile',
        component: ModifierMesInfosComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.ADMIN_INTEGRATEUR,
            ROLES.ADMIN_INTEGRATEUR_BANQUE,
            ROLES.AGENT_CONFORMITE,
            ROLES.ADMIN_SYSTEME_IT,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },

      // --- CONFIGURATION SPECIFIQUE ---
      {
        path: 'configuration-alertes',
        title: 'BCI - Online | Configuration Alertes',
        component: AlertesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_INTEGRATEUR] },
      },
      {
        path: 'configuration-notif-user-defaut',
        title: 'BCI - Online | Configuration Notification par défaut',
        component: ConfigUserDefautNotifsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_INTEGRATEUR] },
      },
      {
        path: 'mes-notifications',
        title: 'BCI - Online | Mes notifications',
        component: MesNotificationsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_INTEGRATEUR] },
      },

      // --- ORGANISATIONS (ADMIN IT) ---
      {
        path: 'org-dashboard',
        title: 'BCI - Online | Tableau de bord Organisation',
        component: OrgDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT] },
      },
      {
        path: 'org-utilisateur',
        title: 'BCI - Online | Liste des utilisateurs',
        component: UtilisteurComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT] },
      },
      {
        path: 'org-utilisateur/:id',
        title: 'BCI - Online | Liste des utilisateurs',
        component: OrgFicheUtilisateurComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT] },
      },
      {
        path: 'org-entreprise',
        title: 'BCI - Online | Liste des entreprises',
        component: OrgListEntrepriseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT, ROLES.DG, ROLES.DGA] },
      },
      {
        path: 'org-entreprise/:id',
        title: 'BCI - Online | Fiche des entreprises',
        component: OrgFicheEntrepriseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT, ROLES.DG, ROLES.DGA] },
      },
      {
        path: 'repporting-export',
        title: 'BCI - Online | Repportings et Exports',
        component: RepportingExportComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT, ROLES.ADMIN_INTEGRATEUR] },
      },
      {
        path: 'transactions-operations',
        title: 'BCI - Online | Transactions et Operations',
        component: TransactionsOperationsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT, ROLES.ADMIN_INTEGRATEUR] },
      },
      {
        path: 'alertes-supervisions',
        title: 'BCI - Online | Alertes et supervisions',
        component: AlertesSupervisionsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT, ROLES.ADMIN_INTEGRATEUR] },
      },
      {
        path: 'beneficiaires',
        title: 'BCI - Online | Liste des beneficiaires',
        component: BeneficiaireComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.ADMIN_SYSTEME_IT] },
      },

      // --- AGENT DE CONFORMITÉ ---
      {
        path: 'agent-dashboard',
        title: 'BCI - Online | Tableau de bord Agent',
        component: AgentDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.AGENT_CONFORMITE] },
      },
      {
        path: 'agent-demandes',
        title: 'BCI - Online | Liste des demandes de souscriptions',
        component: AgentListeDemandesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.AGENT_CONFORMITE] },
      },
      {
        path: 'agent-demandes/:id',
        title: 'BCI - Online | Fiche demandes de souscriptions',
        component: AgentFicheDemandesComponent,
        // Combinaison possible avec d'autres guards
        canActivate: [AuthGuard, RoleGuard, nodeSessionGuard],
        data: { roles: [ROLES.AGENT_CONFORMITE] },
      },
      {
        path: 'agent-entreprise',
        title: 'BCI - Online | Liste des entreprises',
        component: AgentListeEntrepriseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.AGENT_CONFORMITE, ROLES.DG, ROLES.DGA] },
      },
      {
        path: 'entreprise/new',
        title: 'BCI - Online | Crée une entreprise',
        component: CreateEntrepriseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.AGENT_CONFORMITE, ROLES.DG, ROLES.DGA] },
      },
      {
        path: 'agent-entreprise/:id',
        title: 'BCI - Online | Fiche entreprise',
        component: AgentFicheEntrepriseComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.AGENT_CONFORMITE, ROLES.DG, ROLES.DGA] },
      },
      {
        path: 'facturiers',
        title: 'BCI - Online | Liste des facturiés',
        component: FacturiesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.DG, ROLES.DGA, ROLES.ADMIN_INTEGRATEUR_BANQUE] },
      },
      {
        path: 'operateurs-mobiles',
        title: 'BCI - Online | Liste des opérateurs mobiles',
        component: MobileOperatorComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.DG, ROLES.DGA, ROLES.ADMIN_INTEGRATEUR_BANQUE] },
      },

      // --- AGENT TRADE ---
      {
        path: 'agent-trade-dashboard',
        title: 'BCI - Online | Tableau de bord Agent Trade',
        component: AgentTradeDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [ROLES.TRADE_AGENT] },
      },
      {
        path: 'transaction-detail/:id',
        title: 'BCI - Détail de la demande de transaction',
        component: TransactionDetailComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.TRADE_AGENT,
            ROLES.AGENT_CONFORMITE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'transaction-par-derogation',
        title: 'BCI - Online | Transactions internationales par dérogation',
        component: TransactionParDerogationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.TRADE_AGENT,
            ROLES.AGENT_CONFORMITE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'transaction-sans-derogation',
        title: 'BCI - Online | Transactions internationales sans dérogation',
        component: TransactionSansDerogationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.TRADE_AGENT,
            ROLES.AGENT_CONFORMITE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
      {
        path: 'historique-transaction-internationnale',
        title: 'BCI - Online | Historique des transactions des clients',
        component: HistoriqueTransactionInternationnComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [
            ROLES.TRADE_AGENT,
            ROLES.AGENT_CONFORMITE,
            ROLES.DG,
            ROLES.DGA,
          ],
        },
      },
    ],
  },

  // =================== 404 =====================
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
