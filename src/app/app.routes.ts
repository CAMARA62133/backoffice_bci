import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormNouveauPasswordComponent } from './pages/login/form-nouveau-password/form-nouveau-password.component';
import { LoadingPageComponent } from './pages/login/loading-page/loading-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ReinitialiserPasswordComponent } from './pages/login/reinitialiser-password/reinitialiser-password.component';
import { ValiderOtpAfterLoginComponent } from './pages/login/valider-otp-after-login/valider-otp-after-login.component';
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
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
