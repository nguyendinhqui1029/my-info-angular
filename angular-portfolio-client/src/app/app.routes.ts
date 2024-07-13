import { Routes } from '@angular/router';
import { LayoutComponent } from '@client/layout/layout.component';
import { HomeComponent } from '@client/home/home.component';
import { AdminLayoutComponent } from '@admin/layout/admin-layout.component';
import { DashboardComponent } from '@admin/dashboard/dashboard.component';
import { SkillsComponent } from '@pages/client/skills/skills.component';
import { MyLifeComponent } from '@pages/client/my-life/my-life.component';
import { AboutMeComponent } from '@pages/client/about-me/about-me.component';
import { ChildWrapperComponent } from '@components/admin/child-wrapper/child-wrapper.component';
import { NotFound404Component } from '@components/common/not-found-404/not-found-404.component';
import { PATH } from '@constants/common.const';

export const routes: Routes = [
    { path: '', redirectTo: `/${PATH.HOME}`, pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: PATH.HOME, component: HomeComponent },
            { path: PATH.SKILL_WITH_ID, component: SkillsComponent },
            { path:  PATH.MY_LIFE, component: MyLifeComponent },
            { path:  PATH.ABOUT_ME, component: AboutMeComponent }
        ]
    },
    {
        path:  PATH.ADMIN.ROOT,
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.DASHBOARD}`, pathMatch: 'full' },
            { path:  PATH.ADMIN.DASHBOARD, component: DashboardComponent },
            {
                path: PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT,
                loadChildren: () => import('./pages/admin/personal-management/admin-personal.routes').then(mod => mod.personalManagementRouters)
            },
            {
                path: PATH.ADMIN.PAGE_MANAGEMENT.ROOT,
                loadChildren: () => import('./pages/admin/page-management/admin-page.routes').then(mod => mod.pageManagementRouters)
            },
            {
                path: PATH.ADMIN.SETTINGS,
                component: ChildWrapperComponent,
            },
        ]
    },
    { path: PATH.NOT_FOUND, component: NotFound404Component },
    { path: '**', redirectTo: `/${PATH.NOT_FOUND}`, pathMatch: 'full'},
];
