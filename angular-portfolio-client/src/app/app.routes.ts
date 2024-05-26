import { Routes } from '@angular/router';
import { LayoutComponent } from '@client/layout/layout.component';
import { HomeComponent } from '@client/home/home.component';
import { AdminLayoutComponent } from '@admin/layout/admin-layout.component';
import { DashboardComponent } from '@admin/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: '', 
        component: LayoutComponent, 
        children: [
            { path: 'home', component: HomeComponent }
         ]
    },
    { 
        path: '', 
        component: AdminLayoutComponent, 
        children: [
            { path: 'admin', component:  DashboardComponent }
         ]
    }
  ];
