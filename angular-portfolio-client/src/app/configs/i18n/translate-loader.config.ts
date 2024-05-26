import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@environments/environment';

export function createTranslateLoader(http: HttpClient) {
  const apiUrl = true || environment.isUseMock ? `./assets/i18n/` : `${environment.apiUrl}/i18n/`;
  return new TranslateHttpLoader(http, apiUrl, '.json');
}

export function provideTranslation() {
  return {
    defaultLanguage: environment.defaultLanguage,
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    },
  }
}