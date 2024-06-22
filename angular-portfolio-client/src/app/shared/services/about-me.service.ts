import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { FooterResponse } from '@shared/models/footer-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { AboutMeResponseValue } from '@shared/models/personal-info.model';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {
  
  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getAboutMe(): Result<QueryObserverResult<ApiResponse<AboutMeResponseValue>>> {
    return this.query({
      queryKey: [QUERY_KEYS.ABOUT_ME],
      queryFn: () => {
        return this.requestService.get<ApiResponse<AboutMeResponseValue>>('about-me', {
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/about-me-response.mock.json`
        });
      },
    })
  }
  refetchAboutMe(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ABOUT_ME]})
  }
}
