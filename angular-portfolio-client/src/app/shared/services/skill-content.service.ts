import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { FooterResponse } from '@shared/models/footer-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { ContentSection } from '@shared/models/content-section.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillContentService {
  
  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getSkillContent(requestParams: {skillId: string; parentCategoryId: string; childCategoryId: string}): Result<QueryObserverResult<ApiResponse<ContentSection[]>>> {
    let params = new HttpParams().set('skillId', requestParams.skillId)
    .set('parentCategoryId', requestParams.parentCategoryId)
    .set('childCategoryId', requestParams.childCategoryId);

    return this.query({
      queryKey: [QUERY_KEYS.SKILL_CONTENT],
      queryFn: () => {
        return this.requestService.get<ApiResponse<ContentSection[]>>('skill', {
            httpRequestOptions: {params},
            mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/content-skill-response.mock.json`
        });
      },
    })
  }
  refetchSkillContent(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.SKILL_CONTENT]})
  }
}