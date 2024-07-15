import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeaderPageComponent } from '@app/components/common/header-page/header-page.component';
import { MultipleLanguageContainerComponent } from '@app/components/common/multiple-language-container/multiple-language-container.component';
import { UploadImageFieldComponent } from '@app/components/common/upload-image-field/upload-image-field.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { MultipleLanguage } from '@app/shared/models/multiple-language.model';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-company-upsert',
  standalone: true,
  imports: [
    FormsModule, 
    PrimeComponent, 
    HeaderPageComponent, 
    MultipleLanguageContainerComponent,
    UploadImageFieldComponent],
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

  initializeData: {title: string} = {title: '1'}
  initializeLanguages: MultipleLanguage<{title: string}>[] = [{
    languageCode: 'vi',
    name: 'Vietnamese',
    isDefault: true,
    icon: 'https://flagcdn.com/w320/vn.png',
    data: this.initializeData
},
{
  languageCode: 'en',
  name: 'English',
  isDefault: false,
  icon: 'https://flagcdn.com/w320/vi.png',
  data: this.initializeData
}];
}
