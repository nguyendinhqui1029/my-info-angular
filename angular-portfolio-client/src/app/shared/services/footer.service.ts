import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { FooterResponse } from '@shared/models/footer-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  
  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getFooter(): Result<QueryObserverResult<ApiResponse<FooterResponse>>> {
    return this.query({
      queryKey: [QUERY_KEYS.FOOTER],
      queryFn: () => {
        return this.requestService.get<ApiResponse<FooterResponse>>('footer', {
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/footer-response.mock.json`
        });
      },
    })
  }
  refetchFooter(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.FOOTER]})
  }
}
