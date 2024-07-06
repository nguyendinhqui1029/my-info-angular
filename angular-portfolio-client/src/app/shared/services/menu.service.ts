import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { FooterResponse } from '@shared/models/footer-response.model';
import { QueryClient, QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { QUERY_KEYS } from '@app/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { AdminMenu, MenuItem } from '@shared/models/menu.mode';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  private requestService: RequestService = inject(RequestService);
  private translateService: TranslateService = inject(TranslateService);
  private queryClient: QueryClient = injectQueryClient();
  private query = injectQuery();

  getClientMenu(): Result<QueryObserverResult<ApiResponse<MenuItem[]>>> {
    return this.query({
      queryKey: [QUERY_KEYS.MENU_CLIENT],
      queryFn: () => {
        return this.requestService.get<ApiResponse<MenuItem[]>>('client-menu', {
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/menu-client-response.mock.json`
        });
      },
    })
  }
  refetchClientMenu(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.MENU_CLIENT]})
  }

  getAdminMenu(): Result<QueryObserverResult<ApiResponse<AdminMenu[]>>> {
    return this.query({
      queryKey: [QUERY_KEYS.MENU_ADMIN],
      queryFn: () => {
        return this.requestService.get<ApiResponse<AdminMenu[]>>('admin-menu', {
          mockFile: `assets/mock-data/${this.translateService.currentLang || environment.defaultLanguage}/menu-admin-response.mock.json`
        });
      },
    })
  }
  refetchAdminMenu(): void {
    this.queryClient.refetchQueries({ queryKey: [QUERY_KEYS.MENU_ADMIN]})
  }
}
