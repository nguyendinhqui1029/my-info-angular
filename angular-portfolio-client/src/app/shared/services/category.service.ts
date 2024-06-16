import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { FooterResponse } from '@shared/models/footer-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { Category } from '@shared/models/category.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getCategories(idSkill: string): Result<QueryObserverResult<ApiResponse<Category[]>>> {
    const paramsHeader = new HttpParams().set('idSkill', idSkill);
    return this.query({
      queryKey: [QUERY_KEYS.CATEGORIES_BY_ID],
      queryFn: () => {
        return this.requestService.get<ApiResponse<Category[]>>('categories', {
          httpRequestOptions: { params: paramsHeader },
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/categories-by-id-response.mock.json`
        });
      },
    })
  }
  refetchCategories(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.CATEGORIES_BY_ID] })
  }
}
