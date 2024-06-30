import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { Company } from '@shared/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getCompanyDetail(id: string): Result<QueryObserverResult<ApiResponse<Company>>> {
    return this.query({
      queryKey: [QUERY_KEYS.COMPANY_DETAIL],
      queryFn: () => {
        return this.requestService.get<ApiResponse<Company>>(`company/${id}`, {
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/company-by-id-response.mock.json`
        });
      },
    })
  }
  refetchCompanyDetail(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.COMPANY_DETAIL]})
  }
}
