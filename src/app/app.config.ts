import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideToastr} from 'ngx-toastr';
import {routes} from './app.routes';
import {tokenInterceptor} from './core/interceptors/auth/auth.interceptor';
import {provideNgDiagram} from 'ng-diagram';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

// --- Ajouts pour la Locale ---
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Enregistrement de la locale française
registerLocaleData(localeFr, 'fr-FR');
// ----------------------------

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideNgDiagram(), provideCharts(withDefaultRegisterables()),
    provideCharts(withDefaultRegisterables()),
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
};
