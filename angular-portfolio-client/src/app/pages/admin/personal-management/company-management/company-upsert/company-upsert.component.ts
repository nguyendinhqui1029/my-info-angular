import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderPageComponent } from '@app/components/common/header-page/header-page.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-company-upsert',
  standalone: true,
  imports: [TranslateModule, PrimeComponent, HeaderPageComponent, JsonPipe],
  templateUrl: './company-upsert.component.html',
  styleUrl: './company-upsert.component.scss'
})
export class CompanyUpsertComponent {
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  goToListUrl: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT}`;
  companyUpsertHeader = computed(() => ({
    title: 'Company Management',
    description: 'This page is used for register/update company.',
    breadcrumb: [
      {
        link: `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.DASHBOARD}`,
        name: 'Dashboard',
        icon: '',
        isShowIcon: false
    },
    {
      link: `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT}`,
      name: 'Companies Management',
      icon: '',
      isShowIcon: false
    },
    {
      link: `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_REGISTER.replace(':id', this.activatedRoute.snapshot.params['id'])}`,
      name: 'Companies Register',
      icon: '',
      isShowIcon: false
    }
    ]
  }));
}
