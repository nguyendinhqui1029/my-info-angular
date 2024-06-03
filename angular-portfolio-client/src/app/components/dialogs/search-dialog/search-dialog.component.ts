import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { HighlightSearchResultDirective } from '@app/shared/directives/highlight-search-result.directive';
import { ApiResponse } from '@app/shared/models/api-response.model';
import { SearchResult } from '@app/shared/models/search-result.model';
import { SearchService } from '@app/shared/services/search.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'q-search-dialog',
  standalone: true,
  imports: [JsonPipe, PrimeComponent, FormsModule, HighlightSearchResultDirective],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
  providers: [SearchService, TranslateService]
})
export class SearchDialogComponent {
  private searchService: SearchService = inject(SearchService);

  keywordSearch = '';
  searchResult: SearchResult[] = [];
  
  handleSearchChange(event: any) {
    this.keywordSearch = event.target.value; 
    if(!this.keywordSearch) {
      this.searchResult = [];
      return;
    }
    this.searchService.searchByKeyword(this.keywordSearch).subscribe((response: ApiResponse<SearchResult[]>)=>{
      if(response.statusCode === 0) {
        this.searchResult = response.data || [];
      }
    });
  }

}
