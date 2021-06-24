import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CVComponent } from './components/pages/cv/cv.component';
import { TemplateComponent } from './components/pages/template/template.component';
import { PersonalInfoComponent } from './components/pages/personal-info/personal-info.component';
import { AdminContainerComponent } from './components/admin';
import { DetailComponent, LoginPageComponent, MyLifePageComponent, SourceComponent } from './components';
import { AuthGuard } from './app/auth.guard';



const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'cv',
        component: CVComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'info',
        component: PersonalInfoComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
      {
        path: 'my-life',
        component: MyLifePageComponent,
      },
      {
        path: 'source',
        component: SourceComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: AdminContainerComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

export const RouterListModule = routes;
