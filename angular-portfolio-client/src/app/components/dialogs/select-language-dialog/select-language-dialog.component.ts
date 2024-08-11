import { TranslateService } from '@ngx-translate/core';
import { AfterRenderPhase, ChangeDetectorRef, Component, OnInit, afterNextRender, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { LanguageService } from '@app/shared/services/language.service';
import { environment } from '@environments/environment';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageKey } from '@app/constants/common.const';

@Component({
  selector: 'q-select-language-dialog',
  standalone: true,
  imports: [FormsModule, PrimeComponent],
  templateUrl: './select-language-dialog.component.html',
  styleUrl: './select-language-dialog.component.scss',
  providers: [TranslateService]
})
export class SelectLanguageDialogComponent implements OnInit {

  private languageService: LanguageService = inject(LanguageService);
  private translateService: TranslateService = inject(TranslateService);
  private dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  languages = this.languageService.getLanguages().result;
  selectedLanguage: string = environment.defaultLanguage;
  constructor() {
    afterNextRender(() => {
      this.selectedLanguage = localStorage.getItem(LocalStorageKey.language) || environment.defaultLanguage;
      this.changeDetectorRef.detectChanges(); 
    }, { phase: AfterRenderPhase.Read });
  }
  ngOnInit(): void {
    if(this.translateService.currentLang !== this.selectedLanguage) {
      this.translateService.currentLang = this.selectedLanguage;
      this.translateService.use(this.selectedLanguage);
    }
  }

  handleOkClick() {
    localStorage.setItem(LocalStorageKey.language, this.selectedLanguage || environment.defaultLanguage);
    this.dynamicDialogRef.close(this.selectedLanguage)
  }

}
