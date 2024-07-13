import { Routes } from '@angular/router';
import { FooterManagementComponent } from '@admin/page-management/footer-management/footer-management.component';
import { HeaderManagementComponent } from '@admin/page-management/header-management/header-management.component';
export const pageManagementRouters: Routes = [
  { path: '', redirectTo: '/admin/page-management/header-management', pathMatch: 'full' },
  { path: 'header-management', component: HeaderManagementComponent },
  { path: 'footer-management', component: FooterManagementComponent }
];
