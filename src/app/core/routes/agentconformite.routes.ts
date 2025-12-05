import {LayoutComponent} from '../../components/layout/layout.component';
import {AuthGuard} from '../guards/auth/auth-guard.guard';
import {Routes} from '@angular/router';
import {AgentDashboardComponent} from '../../pages/agent-conformite/agent-dashboard/agent-dashboard.component';
import {
  AgentListeDemandesComponent
} from '../../pages/agent-conformite/agent-liste-demandes/agent-liste-demandes.component';
import {
  AgentListeEntrepriseComponent
} from '../../pages/agent-conformite/agent-liste-entreprise/agent-liste-entreprise.component';
import {
  AgentFicheDemandesComponent
} from '../../pages/agent-conformite/agent-fiche-demandes/agent-fiche-demandes.component';
import {
  AgentFicheEntrepriseComponent
} from '../../pages/agent-conformite/agent-fiche-entreprise/agent-fiche-entreprise.component';

export default [
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

      {
        path: 'dashboard',
        title: 'BCI - Online | Tableau de bord',
        component: AgentDashboardComponent,
      },

      {
        path: 'liste-demandes-souscription',
        title: 'BCI - Online | Liste des demandes souscription',
        component: AgentListeDemandesComponent,
      },

      {
        path: 'fiche-demandes-souscription',
        title: 'BCI - Online | Fiche des demandes',
        component: AgentFicheDemandesComponent,
      },

      {
        path: 'liste-entreprise',
        title: 'BCI - Online | Liste des entreprises',
        component: AgentListeEntrepriseComponent,
      },

      {
        path: 'fiche-entreprise',
        title: 'BCI - Online | Fiche des entreprises',
        component: AgentFicheEntrepriseComponent,
      },
    ],
  },
] satisfies Routes;
