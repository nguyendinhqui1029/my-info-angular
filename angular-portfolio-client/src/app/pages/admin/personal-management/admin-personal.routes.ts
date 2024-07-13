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
import { PATH } from '@constants/common.const';

export const personalManagementRouters: Routes = [
  { path: '', redirectTo: `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT}`, pathMatch: 'full' },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT, component: CompanyManagementComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_REGISTER, component: CompanyUpsertComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.EDUCATION_MANAGEMENT, component: EducationManagementComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.EDUCATION_REGISTER, component: EducationUpsertComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.HOBBY_MANAGEMENT, component: HobbyManagementComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.HOBBY_REGISTER, component: HobbyUpsertComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.PROJECT_MANAGEMENT, component: ProjectManagementComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.PROJECT_REGISTER, component: ProjectUpsertComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.SKILL_MANAGEMENT, component: SkillManagementComponent },
  { path: PATH.ADMIN.PERSONAL_MANAGEMENT.SKILL_REGISTER, component: SkillUpsertComponent },
];
