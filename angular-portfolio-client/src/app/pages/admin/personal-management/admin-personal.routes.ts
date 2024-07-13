import { Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { SkillManagementComponent } from './skill-management/skill-management.component';
import { EducationManagementComponent } from './education-management/education-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { HobbyManagementComponent } from './hobby-management/hobby-management.component';

export const personalManagementRouters: Routes = [
  { path: '', redirectTo: '/admin/personal-management/companies-management', pathMatch: 'full' },
  { path: 'companies-management', component: CompanyManagementComponent },
  { path: 'education-management', component: EducationManagementComponent },
  { path: 'hobby-management', component: HobbyManagementComponent },
  { path: 'projects-management', component: ProjectManagementComponent },
  { path: 'skills-management', component: SkillManagementComponent }
];
