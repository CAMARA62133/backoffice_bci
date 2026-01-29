// // ========== AUTH ROUTES ==========
// export const authRoutes: Routes = [
//   {
//     path: 'login',
//     title: 'BCI - Online | Connexion',
//     loadComponent: () =>
//       import('../../pages/auth/login/login.component').then(m => m.LoginComponent),
//   },
//   {
//     path: 'valider-otp-login',
//     title: 'BCI - Online | Validation du code OTP',
//     loadComponent: () =>
//       import('./pages/auth/valider-otp-after-login/valider-otp-after-login.component')
//         .then(m => m.ValiderOtpAfterLoginComponent),
//   },
//   {
//     path: 'validate-email',
//     title: "BCI - Online | Validation de l'email",
//     loadComponent: () =>
//       import('./pages/auth/loading-verify-email-page/loading-verify-email-page.component')
//         .then(m => m.LoadingVerifyEmailPageComponent),
//   },
//   {
//     path: 'validate-email2',
//     title: "BCI - Online | Validation de l'email",
//     loadComponent: () =>
//       import('./pages/auth/verifyemail-afterchange-page/verifyemail-afterchange-page.component')
//         .then(m => m.VerifyemailAfterchangePageComponent),
//   },
//   {
//     path: 'valider-otp-email',
//     title: 'BCI - Online | Validation du code OTP',
//     loadComponent: () =>
//       import('./pages/auth/validate-otp-after-verified-email/validate-otp-after-verified-email.component')
//         .then(m => m.ValidateOtpAfterVerifiedEmailComponent),
//   },
//   {
//     path: 'reinitialiser-mot-de-passe',
//     title: 'BCI - Online | Mot de passe oublié',
//     loadComponent: () =>
//       import('./pages/auth/reinitialiser-password/reinitialiser-password.component')
//         .then(m => m.ReinitialiserPasswordComponent),
//   },
//   {
//     path: 'reset',
//     title: 'BCI - Online | Réinitialisation du mot de passe',
//     loadComponent: () =>
//       import('./pages/auth/loading-page/loading-page.component')
//         .then(m => m.LoadingPageComponent),
//   },
//   {
//     path: 'nouveau-mot-de-passe',
//     title: 'BCI - Online | Nouveau mot de passe',
//     loadComponent: () =>
//       import('./pages/auth/form-nouveau-password/form-nouveau-password.component')
//         .then(m => m.FormNouveauPasswordComponent),
//   },
//   {
//     path: 'org-nouveau-mot-de-passe',
//     title: 'BCI - Online | Nouveau mot de passe',
//     loadComponent: () =>
//       import('./pages/auth/reset-org-password/reset-org-password.component')
//         .then(m => m.ResetOrgPasswordComponent),
//   },
//   {
//     path: 'valider-otp',
//     title: 'BCI - Online | Validation du code OTP de modification',
//     loadComponent: () =>
//       import('./pages/auth/otp-after-change-info/otp-after-change-info.component')
//         .then(m => m.OtpAfterChangeInfoComponent),
//   },
//   {
//     path: 'unauthorized',
//     title: 'BCI - Online | Unauthorized',
//     loadComponent: () =>
//       import('./pages/auth/unauthorized/unauthorized.component')
//         .then(m => m.UnauthorizedComponent),
//   },
//   {
//     path: 'test-diagram',
//     title: 'BCI - Online | Test Diagram',
//     loadComponent: () =>
//       import('./components/my-diagram-component/my-diagram-component.component')
//         .then(m => m.MyDiagramComponentComponent),
//   },
//   {
//     path: 'not-found',
//     title: 'BCI - Online | Page non trouvée',
//     loadComponent: () =>
//       import('./components/shared/errors/page404-not-found/page404-not-found.component')
//         .then(m => m.Page404NotFoundComponent),
//   },
//   {
//     path: 'lien-expire',
//     title: 'BCI - Online | Lien expiré',
//     loadComponent: () =>
//       import('./components/shared/errors/page404/page404.component')
//         .then(m => m.Page404Component),
//   },
// ];
