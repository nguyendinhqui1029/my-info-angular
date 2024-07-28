import { Component, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CustomTableComponent } from '@app/components/common/custom-table/custom-table.component';
import { DynamicSearchFormComponent } from '@app/components/common/dynamic-search-form/dynamic-search-form.component';
import { FilterFormComponent } from '@app/components/common/filter-form/filter-form.component';
import { HeaderPageComponent } from '@app/components/common/header-page/header-page.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH, QUERY_KEYS } from '@app/constants/common.const';
import { ApiResponseWithPagination } from '@app/shared/models/api-response.model';
import { CompanyDetailWithLanguageResponseValue } from '@app/shared/models/company.model';
import { FilterOptions } from '@app/shared/models/filter.model';
import { SearchFormConfig } from '@app/shared/models/search-form.model';
import { TableHeaderConfig } from '@app/shared/models/table.model';
import { CompanyService } from '@app/shared/services/company.service';
import { environment } from '@environments/environment';
import { injectQuery, injectQueryClient } from '@ngneat/query';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription, lastValueFrom, switchMap } from 'rxjs';

@Component({
  selector: 'q-company-management',
  standalone: true,
  imports: [PrimeComponent, HeaderPageComponent, DynamicSearchFormComponent, TranslateModule, FilterFormComponent, CustomTableComponent],
  templateUrl: './company-management.component.html',
  styleUrl: './company-management.component.scss',
  providers: [TranslateService]
})
export class CompanyManagementComponent implements OnInit, OnDestroy {
  private companyService: CompanyService = inject(CompanyService);
  private translateService: TranslateService = inject(TranslateService);
  private subscription!: Subscription;

  filterForm: {
    orderBy: string;
    pageSize: string;
  } = {
      orderBy: 'all',
      pageSize: '10'
    };

  searchForm: {
    companyName: string;
    startDate: Date | null,
    endDate: Date | null
  } = {
      companyName: '',
      startDate: null,
      endDate: null
    };

  currentPage: number = 1;

  filterField: FilterOptions[] = [
    {
      title: 'Sort',
      key: 'orderBy',
      initialValue: 'all',
      options: [
        {
          id: 'all',
          name: 'All',
          value: 'all'
        },
        {
          id: 'create',
          name: 'Create',
          value: 'create'
        }
      ]
    },
    {
      title: 'View',
      key: 'pageSize',
      initialValue: '10',
      options: [
        {
          id: '10',
          name: '10',
          value: '10'
        },
        {
          id: '20',
          name: '20',
          value: '20'
        }
      ]
    }
  ];
  fieldConfig: SearchFormConfig[] = [{
    name: 'Field Name 1',
    isRequired: true,
    initialValue: '',
    key: 'companyName',
    type: 'TEXT',
    span: 1
  }];

  registerLink: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT}/register`;
  dataHeaderTable: TableHeaderConfig[] = [{
    key: 'name',
    header: 'company_name',
  },
  {
    key: 'thumbnailUrl',
    header: 'thumbnail',
  },
  {
    key: 'shortDescription',
    header: 'short_description',
  },
  {
    key: 'startDate',
    header: 'working_time',
  },
  {
    key: 'id',
    header: 'delete',
  }
  ];

  requestParam = signal({
    page: this.currentPage,
    pageSize: +this.filterForm.pageSize,
    order: this.filterForm.orderBy,
    companyName: this.searchForm.companyName,
    startDate: this.searchForm.startDate,
    endDate: this.searchForm.endDate
  });

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
      }
    ]
  }));

  dataTable: CompanyDetailWithLanguageResponseValue[] = [];
  totalCount: number = 0;

  resourceLink: string = environment.resourceHost;

  ngOnInit(): void {
    this.subscription = this.translateService.onLangChange.pipe(switchMap(()=> this.companyService.getCompanies(this.requestParam()))).subscribe((value: ApiResponseWithPagination<CompanyDetailWithLanguageResponseValue[]>) => {
      this.dataTable = value.data || [];
      this.totalCount = value.totalCount;
    });
  }

  handleDeleteItem(id: string) {
    console.log(id)
  }

  ngOnDestroy(): void {
   if(this.subscription) {
    this.subscription.unsubscribe();
   }
  }
  handleFilterClick(value: Record<string, string>) {
    this.filterForm = {
      orderBy: value['orderBy'],
      pageSize: value['pageSize']
    };
    this.requestParam.set({
      page: this.currentPage,
      pageSize: +this.filterForm.pageSize,
      order: this.filterForm.orderBy,
      companyName: this.searchForm.companyName,
      startDate: this.searchForm.startDate,
      endDate: this.searchForm.endDate
    });
    this.companyService.getCompanies(this.requestParam()).subscribe((value: ApiResponseWithPagination<CompanyDetailWithLanguageResponseValue[]>) => {
      this.dataTable = value.data || [];
      this.totalCount = value.totalCount;
    });
  }

  handleSearchClick(value: Record<string, string | string[] | boolean | Date | null>) {
    this.searchForm = { 
      companyName: value['companyName'] as string || '',
      startDate: value['startDate'] as Date || null,
      endDate: value['endDate'] as Date || null 
    };
    this.requestParam.set({
      page: this.currentPage,
      pageSize: +this.filterForm.pageSize,
      order: this.filterForm.orderBy,
      companyName: this.searchForm.companyName,
      startDate: this.searchForm.startDate,
      endDate: this.searchForm.endDate
    });
    this.companyService.getCompanies(this.requestParam()).subscribe((value: ApiResponseWithPagination<CompanyDetailWithLanguageResponseValue[]>) => {
      this.dataTable = value.data || [];
      this.totalCount = value.totalCount;
    });
  }
}
