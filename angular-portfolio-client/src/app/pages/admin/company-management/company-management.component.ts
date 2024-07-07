import { Component } from '@angular/core';
import { DynamicSearchFormComponent } from '@app/components/common/dynamic-search-form/dynamic-search-form.component';
import { FilterFormComponent } from '@app/components/common/filter-form/filter-form.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { FilterOptions } from '@app/shared/models/filter.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-company-management',
  standalone: true,
  imports: [PrimeComponent, DynamicSearchFormComponent, TranslateModule, FilterFormComponent],
  templateUrl: './company-management.component.html',
  styleUrl: './company-management.component.scss'
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

  handleFilterClick(value: Record<string, string>) {
    console.log(value);
  }
}
