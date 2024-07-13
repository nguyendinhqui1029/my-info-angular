import { Component, computed } from '@angular/core';
import { CustomTableComponent } from '@app/components/common/custom-table/custom-table.component';
import { DynamicSearchFormComponent } from '@app/components/common/dynamic-search-form/dynamic-search-form.component';
import { FilterFormComponent } from '@app/components/common/filter-form/filter-form.component';
import { HeaderPageComponent } from '@app/components/common/header-page/header-page.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@app/constants/common.const';
import { FilterOptions } from '@app/shared/models/filter.model';
import { SearchFormConfig } from '@app/shared/models/search-form.model';
import { TableHeaderConfig } from '@app/shared/models/table.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'q-company-management',
  standalone: true,
  imports: [PrimeComponent, HeaderPageComponent, DynamicSearchFormComponent, TranslateModule, FilterFormComponent, CustomTableComponent],
  templateUrl: './company-management.component.html',
  styleUrl: './company-management.component.scss',
  providers: [TranslateService]
})
export class CompanyManagementComponent {
  filterField: FilterOptions[] = [
    {
      title: 'Sort',
      key: 'sortBy',
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
      key: 'view',
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
    key: 'keyword',
    type: 'TEXT',
    span: 1
},
{
  name: 'Field Name 2',
  isRequired: true,
  initialValue: '1',
  key: 'keyword1',
  type: 'DROPDOWN',
  span: 1,
  options: [{
    id: '1',
    name: '1',
    value: '1'
  },
  {
    id: '2',
    name: '3',
    value: '4'
  }]
},
{
  name: 'Field Name 3',
  isRequired: true,
  initialValue: '1',
  key: 'keyword2',
  type: 'CHECKBOX',
  span: 1,
  options: [{
    id: '1',
    name: '1',
    value: '1'
  },
  {
    id: '2',
    name: '3',
    value: '4'
  }]
},
{
  name: 'Field Name 4',
  isRequired: true,
  initialValue: '1',
  key: 'keyword5',
  type: 'RADIO',
  span: 1,
  options: [{
    id: '1',
    name: '1',
    value: '1'
  },
  {
    id: '2',
    name: '3',
    value: '4'
  }]
}];
dataHeaderTable: TableHeaderConfig<{col: string, col2: string, col3: string}>[] = [{
  key: 'col',
  header: 'Header 1',
},
{
  key: 'col2',
  header: 'Header 2',
},
{
  key: 'col3',
  header: 'Header 3',
}
];
dataTable: {col: string, col2: string, col3: string}[] = [{col: 'string', col2: 'string', col3: 'string'},{col: 'string', col2: 'string', col3: 'string'}];


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
  handleFilterClick(value: Record<string, string>) {
    console.log(value);
  }

  handleSearchClick(value: Record<string, string | string[] | boolean>) {
    console.log(value);
  }
}
