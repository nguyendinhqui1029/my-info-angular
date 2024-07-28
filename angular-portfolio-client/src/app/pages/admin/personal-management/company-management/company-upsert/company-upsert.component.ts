import { Component, NgZone, OnInit, computed, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateRangeComponent } from '@app/components/common/date-range/date-range.component';
import { HeaderPageComponent } from '@app/components/common/header-page/header-page.component';
import { MultipleLanguageContainerComponent } from '@app/components/common/multiple-language-container/multiple-language-container.component';
import { UploadImageFieldComponent } from '@app/components/common/upload-image-field/upload-image-field.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { MultipleLanguage } from '@app/shared/models/multiple-language.model';
import { PAGE_TYPE, PATH } from '@constants/common.const';
import { CkeditorWrapperComponent } from '@app/components/common/ckeditor-wrapper/ckeditor-wrapper.component';
import { CompanyService } from '@app/shared/services/company.service';
import { CompanyRequestBody, CompanyResponseValue, LanguageForm, LanguageResponseValue } from '@app/shared/models/company.model';
import { LanguageItem } from '@app/shared/models/language.model';
import { ValidatorService } from '@app/shared/services/validators.service';
import { TransformErrorMessagePipe } from '@app/shared/pipes/transform-error-message.pipe';
import { ApiResponse, ResponseSuccessValue } from '@app/shared/models/api-response.model';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

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
    DateRangeComponent,
    CkeditorWrapperComponent,
    TransformErrorMessagePipe
  ],
  templateUrl: './company-upsert.component.html',
  styleUrl: './company-upsert.component.scss',
  providers: [ConfirmationService]
})
export class CompanyUpsertComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private route: Router = inject(Router);
  private zone: NgZone = inject(NgZone);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private companyService: CompanyService = inject(CompanyService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private translateService: TranslateService = inject(TranslateService);


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

  initializeLanguages: MultipleLanguage<LanguageForm>[] = [{
    languageCode: 'vi',
    name: this.translateService.instant('vi_language'),
    isDefault: true,
    icon: 'https://flagcdn.com/w320/vn.png',
    data: {
      companyName: '',
      companyAddress: '',
      shortDescription: '',
      description: ''
    }
  }];

  companyForm!: FormGroup;
  isEdit: boolean = false;
  companyDetailResponse!: CompanyResponseValue | null;

  languageFormArray = computed(() => {
    return this.companyForm.get('languages') as FormArray
  });

  ngOnInit(): void {
    this.isEdit = this.activatedRoute.snapshot.params['id'] === PAGE_TYPE.EDIT;
    if (this.isEdit) {
      const companyId = this.activatedRoute.snapshot.queryParams['id'];
      this.companyService.getCompanyDetail(companyId).subscribe((response: ApiResponse<CompanyResponseValue>) => {
        if (response?.statusCode === 200) {
          this.companyDetailResponse = response.data;
          this.initializeLanguages = this.companyDetailResponse?.languages.map((item: LanguageResponseValue) => ({
            languageCode: item.languageCode,
            isDefault: item.isDefault,
            data: {
              companyName: item.name || '',
              companyAddress: item.address || '',
              shortDescription: item.shortDescription || '',
              description: item.description || ''
            }
          })) || [];
          this.initCompanyForm();
        }});
        return;
    }
    this.initCompanyForm();
  }

  initCompanyForm() {
    const startDate = this.companyDetailResponse?.startDate ? new Date(this.companyDetailResponse.startDate) : null;
    const endDate = this.companyDetailResponse?.endDate ? new Date(this.companyDetailResponse.endDate) : null;
    const thumbnail = this.companyDetailResponse?.thumbnailUrl || '';
    const images = this.companyDetailResponse?.images || [];

    this.companyForm = this.formBuilder.group({
      workingTime: [{ startDate, endDate }, [ValidatorService.dateRangeRequired('field_required_message')]],
      thumbnail: [[thumbnail], [ValidatorService.fieldRequired('field_required_message')]],
      images: [images, [ValidatorService.fieldRequired('field_required_message')]],
      languages: this.formBuilder.array([])
    });

    this.initializeLanguages.forEach((item: MultipleLanguage<LanguageForm>) => {
      (this.companyForm.get('languages') as FormArray).push(this.formBuilder.group({
        languageCode: [item.languageCode],
        companyName: [item.data.companyName || '', [ValidatorService.fieldRequired('field_required_message_by_language')]],
        companyAddress: [item.data.companyAddress || '', [ValidatorService.fieldRequired('field_required_message_by_language')]],
        shortDescription: [item.data.shortDescription || '', [ValidatorService.fieldRequired('field_required_message_by_language')]],
        description: [item.data.description || '', [ValidatorService.fieldRequired('field_required_message_by_language')]]
      }));
    })
  }

  handleAddNewLanguageForm(value: LanguageItem[]) {
    this.initializeLanguages.push(...value.map((item: LanguageItem) => ({
      languageCode: item.code,
      name: item.name,
      isDefault: false,
      icon: item.flag,
      data: {
        companyName: '',
        companyAddress: '',
        shortDescription: '',
        description: ''
      }
    })));
    this.initializeLanguages = [...this.initializeLanguages];

    value.map((item: LanguageItem) => {
      (this.companyForm.get('languages') as FormArray).push(this.formBuilder.group({
        languageCode: [item.code],
        companyName: ['', [ValidatorService.fieldRequired('field_required_message_by_language')]],
        companyAddress: ['', [ValidatorService.fieldRequired('field_required_message_by_language')]],
        shortDescription: ['', [ValidatorService.fieldRequired('field_required_message_by_language')]],
        description: ['', [ValidatorService.fieldRequired('field_required_message_by_language')]]
      }));
    });
  }

  handleRemoveLanguageForm(value: MultipleLanguage<LanguageForm>) {
    const index = this.initializeLanguages.findIndex((item: MultipleLanguage<LanguageForm>) => item.languageCode === value.languageCode);
    if (index !== -1) {
      this.initializeLanguages.splice(index, 1);
      (this.companyForm.get('languages') as FormArray).removeAt(index);
    }
  }

  handleRegisterClick() {
    this.companyForm.markAllAsTouched();
    const formValid = this.companyForm.valid;
    if (formValid) {
      const body: CompanyRequestBody = {
        id: this.activatedRoute.snapshot.queryParams['id'] || null,
        thumbnailUrl: this.companyForm.value.thumbnail[0] || '',
        startDate: this.companyForm.value.workingTime.startDate.toISOString(),
        endDate: this.companyForm.value.workingTime.endDate.toISOString(),
        images: this.companyForm.value.images,
        languages: this.initializeLanguages.map((item: MultipleLanguage<LanguageForm>) => {
          const data = this.companyForm.value.languages.find((languageFormItem: {
            languageCode: string;
            companyName: string;
            companyAddress: string;
            shortDescription: string;
            description: string
          }) => item.languageCode === languageFormItem.languageCode);
          return {
            languageCode: item.languageCode,
            isDefault: item.isDefault,
            name: data?.companyName || '',
            address: data?.companyAddress || '',
            description: data?.description || '',
            shortDescription: data?.shortDescription || ''
          }
        })
      };
      const responseObservables = this.isEdit ? this.companyService.updateCompany(body) : this.companyService.createCompany(body);
      responseObservables.subscribe((response: ResponseSuccessValue) => {
        if (response.statusCode !== 200) {
          this.confirmationService.confirm({
            message: response.statusText,
            header: '',
            icon: 'pi pi-info-circle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectVisible: false,
            acceptButtonStyleClass: "p-button p-button-sm",
            accept: () => {
              return;
            }
          });
          return;
        }
        this.confirmationService.confirm({
          message: this.translateService.instant('save_successfully'),
          header: '',
          icon: 'pi pi-verified',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectVisible: false,
          acceptButtonStyleClass: "p-button p-button-sm",
          accept: () => {
            this.zone.run(() => this.route.navigateByUrl(this.goToListUrl));
          }
        });
      });

    }
  }
}
