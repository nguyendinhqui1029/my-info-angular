import { Routes } from '@angular/router';
import { LayoutComponent } from '@pages/client/layout/layout.component';
import { HomeComponent } from '@pages/client/home/home.component';
import { AdminLayoutComponent } from '@pages/admin/layout/admin-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: '', 
        component: LayoutComponent, 
        children: [
            { path: '/home', component: HomeComponent }
         ]
    },
    { path: 'admin', component: AdminLayoutComponent },
  ];
