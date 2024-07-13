import { Routes } from '@angular/router';
import { ProjectManagementComponent } from '@admin/personal-management/project-management/project-management.component';
import { SkillManagementComponent } from '@admin/personal-management/skill-management/skill-management.component';
import { EducationManagementComponent } from '@admin/personal-management/education-management/education-management.component';
import { CompanyManagementComponent } from '@admin/personal-management/company-management/company-management.component';
import { HobbyManagementComponent } from '@admin/personal-management/hobby-management/hobby-management.component';
import { CompanyUpsertComponent } from '@admin/personal-management/company-management/company-upsert/company-upsert.component';
import { EducationUpsertComponent } from '@admin/personal-management/education-management/education-upsert/education-upsert.component';
import { SkillUpsertComponent } from '@admin/personal-management/skill-management/skill-upsert/skill-upsert.component';
import { ProjectUpsertComponent } from '@admin/personal-management/project-management/project-upsert/project-upsert.component';
import { HobbyUpsertComponent } from '@admin/personal-management/hobby-management/hobby-upsert/hobby-upsert.component';

export const personalManagementRouters: Routes = [
  { path: '', redirectTo: '/admin/personal-management/companies-management', pathMatch: 'full' },
  { path: 'companies-management', component: CompanyManagementComponent },
  { path: 'companies-management/:id', component: CompanyUpsertComponent },
  { path: 'education-management', component: EducationManagementComponent },
  { path: 'education-management/:id', component: EducationUpsertComponent },
  { path: 'hobby-management', component: HobbyManagementComponent },
  { path: 'hobby-management/:id', component: HobbyUpsertComponent },
  { path: 'projects-management', component: ProjectManagementComponent },
  { path: 'projects-management/:id', component: ProjectUpsertComponent },
  { path: 'skills-management', component: SkillManagementComponent },
  { path: 'skills-management/:id', component: SkillUpsertComponent },
];
