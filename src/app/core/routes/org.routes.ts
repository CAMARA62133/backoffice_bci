import {LayoutComponent} from '../../components/layout/layout.component';
import {AuthGuard} from '../guards/auth/auth-guard.guard';
import {Routes} from '@angular/router';
import {OrgDashboardComponent} from '../../pages/orgs/org-dashboard/org-dashboard.component';
import {RepportingExportComponent} from '../../pages/orgs/repporting-export/repporting-export.component';
import {TransactionsOperationsComponent} from '../../pages/orgs/transactions-operations/transactions-operations.component';
import {AlertesSupervisionsComponent} from '../../pages/orgs/alertes-supervisions/alertes-supervisions.component';
import {OrgListEntrepriseComponent} from '../../pages/orgs/org-list-entreprise/org-list-entreprise.component';
import {OrgListUtilisateurComponent} from '../../pages/orgs/org-list-utilisateur/org-list-utilisateur.component';
import {OrgFicheEntrepriseComponent} from '../../pages/orgs/org-fiche-entreprise/org-fiche-entreprise.component';
import {OrgFicheUtilisateurComponent} from '../../pages/orgs/org-fiche-utilisateur/org-fiche-utilisateur.component';

export const orgRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {path: 'dashboard', title: 'BCI - Online | Tableau de bord Organisation', component: OrgDashboardComponent},

      {path: 'utilisateurs', title: 'BCI - Online | Liste des utilisateurs', component: OrgListUtilisateurComponent},

      {
        path: 'utilisateurs/:id',
        title: 'BCI - Online | Liste des utilisateurs',
        component: OrgFicheUtilisateurComponent
      },

      {path: 'entreprise', title: 'BCI - Online | Liste des entreprises', component: OrgListEntrepriseComponent},

      {
        path: 'entreprise/:id',
        title: 'BCI - Online | Fiche des entreprises',
        component: OrgFicheEntrepriseComponent,
      },

      {
        path: 'repporting-export',
        title: 'BCI - Online | Repportings et Exports',
        component: RepportingExportComponent,
      },

      {
        path: 'transactions-operations',
        title: 'BCI - Online | Transactions et Operations',
        component: TransactionsOperationsComponent,
      },

      {
        path: 'alertes-supervision',
        title: 'BCI - Online | Alertes et supervisions',
        component: AlertesSupervisionsComponent,
      },
    ],
  },
];
