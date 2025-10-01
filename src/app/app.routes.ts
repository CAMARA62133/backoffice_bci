import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ValiderOtpAfterLoginComponent } from './pages/login/valider-otp-after-login/valider-otp-after-login.component';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { PublicGuard } from './services/guard/public-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    title: 'BCI - Online | Connexion',
    component: LoginComponent,
    canActivate: [PublicGuard],
  },

  {
    path: 'valider-otp-login',
    title: 'BCI - Online | Validation du code OTP',
    component: ValiderOtpAfterLoginComponent,
    canActivate: [PublicGuard], 
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
      // {
      //   path: 'logout',
      //   title: 'BCI - Online | Déconnexion',
      //   canActivate: [AuthGuard],
      // },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
