import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { allComponent, allComponentTypeConfig } from '../components';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { allService, allServiceTypeConfig } from 'src/service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { COMPONENT_CONFIG_TOKEN, SERVICE_CONFIG_TOKEN } from 'src/config/injection-token';
import { RouterListModule } from '../router.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { allDirective } from 'src/directive';
import { allPipe } from 'src/pipe';
import { allComponentAdmin, allComponentAdminTypeConfig } from 'src/components/admin';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './auth.guard';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CKEditorModule } from 'ckeditor4-angular';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';

const googleLoginOptions = {
  scope: 'profile email'
};

@NgModule({
  declarations: [
    AppComponent,
    ...allComponent,
    ...allDirective,
    ...allPipe,
    ...allComponentAdmin
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    CKEditorModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(RouterListModule, { relativeLinkResolution: 'legacy' }),
    MatCarouselModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SocialLoginModule
  ],
  providers: [...allService, AuthGuard,
  {
    provide: SERVICE_CONFIG_TOKEN,
    useValue: allServiceTypeConfig,
    multi: true
  },
  {
    provide: COMPONENT_CONFIG_TOKEN,
    useValue: [...allComponentTypeConfig, ...allComponentAdminTypeConfig],
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.client_key.google.key,
            googleLoginOptions
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(environment.client_key.facebook.key)
        }
      ]
    } as SocialAuthServiceConfig,
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [...allComponent, ...allComponentAdmin],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}