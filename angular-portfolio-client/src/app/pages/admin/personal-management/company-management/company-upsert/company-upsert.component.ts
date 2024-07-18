import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateRangeComponent } from '@app/components/common/date-range/date-range.component';
import { HeaderPageComponent } from '@app/components/common/header-page/header-page.component';
import { MultipleLanguageContainerComponent } from '@app/components/common/multiple-language-container/multiple-language-container.component';
import { UploadImageFieldComponent } from '@app/components/common/upload-image-field/upload-image-field.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { MultipleLanguage } from '@app/shared/models/multiple-language.model';
import { PATH } from '@constants/common.const';
@Component({
  selector: 'q-company-upsert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, 
    PrimeComponent, 
    HeaderPageComponent, 
    MultipleLanguageContainerComponent,
    UploadImageFieldComponent,
    DateRangeComponent
    ],
  templateUrl: './company-upsert.component.html',
  styleUrl: './company-upsert.component.scss'
})
export class CompanyUpsertComponent implements OnInit{
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  formBuilder: FormBuilder = inject(FormBuilder);

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

  companyForm!:FormGroup;
  languageForm!:FormGroup;

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      workingTime: [{startDate: null, endDate: null}, [Validators.required]],
    });
    this.languageForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }
  handleRegisterClick() {
    console.log(this.companyForm)
    console.log(this.languageForm)
  }
}
