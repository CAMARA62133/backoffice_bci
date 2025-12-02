import {Routes} from '@angular/router';
import {LayoutComponent} from '../components/layout/layout.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {AuthGuard} from '../guards/auth/auth-guard.guard';
import {OrganisationsComponent} from '../pages/organisations/organisations.component';
import {LogUserComponent} from '../pages/logs/log-user/log-user.component';
import {LogOrgComponent} from '../pages/logs/log-org/log-org.component';
import {UtilisteurComponent} from '../pages/utilisateurs/utilisteur.component';
import {ModifierMesInfosComponent} from '../pages/modifier-mes-infos/modifier-mes-infos.component';
import {NotificationsComponent} from '../pages/notifications/notifications.component';
import {AlertesComponent} from '../pages/alertes/alertes.component';
import {ConfigUserDefautNotifsComponent} from '../pages/config-user-defaut-notifs/config-user-defaut-notifs.component';
import {MesNotificationsComponent} from '../pages/mes-notifications/mes-notifications.component';

export default [

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
    ],
  },
] satisfies Routes;
