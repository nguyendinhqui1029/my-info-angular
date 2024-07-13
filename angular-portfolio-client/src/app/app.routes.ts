import { Routes } from '@angular/router';
import { LayoutComponent } from '@client/layout/layout.component';
import { HomeComponent } from '@client/home/home.component';
import { AdminLayoutComponent } from '@admin/layout/admin-layout.component';
import { DashboardComponent } from '@admin/dashboard/dashboard.component';
import { SkillsComponent } from '@pages/client/skills/skills.component';
import { MyLifeComponent } from '@pages/client/my-life/my-life.component';
import { AboutMeComponent } from '@pages/client/about-me/about-me.component';
import { CompanyManagementComponent } from '@app/pages/admin/personal-management/company-management/company-management.component';
import { EducationManagementComponent } from '@app/pages/admin/personal-management/education-management/education-management.component';
import { FooterManagementComponent } from '@pages/admin/footer-management/footer-management.component';
import { HobbyManagementComponent } from '@app/pages/admin/personal-management/hobby-management/hobby-management.component';
import { ProjectManagementComponent } from '@app/pages/admin/personal-management/project-management/project-management.component';
import { SkillManagementComponent } from '@app/pages/admin/personal-management/skill-management/skill-management.component';
import { ChildWrapperComponent } from '@components/admin/child-wrapper/child-wrapper.component';
import { NotFound404Component } from '@components/common/not-found-404/not-found-404.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'skills/:id', component: SkillsComponent },
            { path: 'my-life', component: MyLifeComponent },
            { path: 'about-me', component: AboutMeComponent }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'personal-management',
                loadChildren: () => import('./pages/admin/personal-management/admin-personal.routes').then(mod => mod.personalManagementRouters)
            },
            { path: 'footer-management', component: FooterManagementComponent },
            {
                path: 'settings',
                component: ChildWrapperComponent,
            },
        ]
    },
    { path: 'not-found', component: NotFound404Component },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full'},
];
