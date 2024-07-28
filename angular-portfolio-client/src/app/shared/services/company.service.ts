import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse, ApiResponseWithPagination, ResponseSuccessValue } from '@shared/models/api-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { CompanyDetailWithLanguageResponseValue, CompanyRequestBody, CompanyRequestParams, CompanyResponseValue } from '@shared/models/company.model';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getCompanyDetailWithLanguage(id: string): Result<QueryObserverResult<ApiResponse<CompanyDetailWithLanguageResponseValue>>> {
    return this.query({
      queryKey: [QUERY_KEYS.COMPANY_DETAIL, id],
      queryFn: () => {
        return this.requestService.get<ApiResponse<CompanyDetailWithLanguageResponseValue>>(`company/language/${id}`, {
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/company-by-id-response.mock.json`
        });
      },
    })
  }
  refetchCompanyDetailWithLanguage(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.COMPANY_DETAIL] })
  }

  getCompanyDetail(id: string): Observable<ApiResponse<CompanyResponseValue>> {
    return this.requestService.get<ApiResponse<CompanyResponseValue>>(`company/${id}`, {
      mockFile: `assets/mock-data/admin/company-form-response.mock.json`
    });
  }

  createCompany(body: CompanyRequestBody) {
    return this.requestService.post<ResponseSuccessValue>('company', body, {
      mockFile: `assets/mock-data/response-success.mock.json`
    });
  }

  updateCompany(body: CompanyRequestBody) {
    return this.requestService.put<ResponseSuccessValue>(`company/${body.id}`, body, {
      mockFile: `assets/mock-data/response-success.mock.json`
    });
  }

  deleteCompany(id: string) {
    return this.requestService.delete<ResponseSuccessValue>(`company/${id}`, {
      mockFile: `assets/mock-data/response-success.mock.json`
    });
  }

  getCompanies(params: CompanyRequestParams): Observable<ApiResponseWithPagination<CompanyDetailWithLanguageResponseValue[]>> {
    const paramsHeader = new HttpParams().set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString())
      .set('order', params.order.toString())
      .set('companyName', params.companyName.toString())
      .set('startDate', params.startDate?.toISOString() || '')
      .set('endDate', params.endDate?.toISOString() || '');

    return this.requestService.get<ApiResponseWithPagination<CompanyDetailWithLanguageResponseValue[]>>(`company`, {
      httpRequestOptions: { params: paramsHeader },
      mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/company-list-response.mock.json`
    });
  }
}
