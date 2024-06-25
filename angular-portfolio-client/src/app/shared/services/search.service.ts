import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { SearchResult } from '@shared/models/search-result.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
 
  searchByKeyword(keyword: string): Observable<ApiResponse<SearchResult[]>>{
    let params = new HttpParams().set('query', keyword);
    return this.requestService.get<ApiResponse<SearchResult[]>>('search', {
      httpRequestOptions: {params},
      mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/search-response.mock.json`
    });
  }
}
