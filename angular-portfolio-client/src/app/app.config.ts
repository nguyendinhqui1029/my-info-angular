import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RequestInterceptor } from '@interceptors/request.interceptors';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslation } from '@configs/i18n/translate-loader.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }, provideAnimationsAsync(),
  ]
};
