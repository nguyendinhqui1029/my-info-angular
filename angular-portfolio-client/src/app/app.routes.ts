import { Routes } from '@angular/router';
import { LayoutComponent } from '@client/layout/layout.component';
import { HomeComponent } from '@client/home/home.component';
import { AdminLayoutComponent } from '@admin/layout/admin-layout.component';
import { DashboardComponent } from '@admin/dashboard/dashboard.component';
import { SkillsComponent } from '@pages/client/skills/skills.component';
import { MyLifeComponent } from '@pages/client/my-life/my-life.component';
import { AboutMeComponent } from '@pages/client/about-me/about-me.component';

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
            { path: 'dashboard', component:  DashboardComponent }
         ]
    }
  ];
