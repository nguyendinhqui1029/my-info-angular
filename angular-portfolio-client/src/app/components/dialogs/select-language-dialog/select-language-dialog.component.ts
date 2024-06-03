import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { LanguageService } from '@app/shared/services/language.service';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs/internal/Subscription';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-select-language-dialog',
  standalone: true,
  imports: [FormsModule, PrimeComponent],
  templateUrl: './select-language-dialog.component.html',
  styleUrl: './select-language-dialog.component.scss',
  providers: [TranslateService]
})
export class SelectLanguageDialogComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  private languageService: LanguageService = inject(LanguageService);
  private translateService: TranslateService = inject(TranslateService);
  private dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  
  languages = this.languageService.getLanguages().result;
  selectedLanguage: string = environment.defaultLanguage;
  
  ngOnInit(): void {
    if(this.translateService.currentLang) {
      this.selectedLanguage = this.translateService.currentLang;
    }
    
    this.subscription = this.translateService.onLangChange.subscribe(()=> this.languageService.refetchLanguages());
  }

  handleOkClick() {
    this.dynamicDialogRef.close(this.selectedLanguage)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
