import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { LocalStorageKey } from '@app/constants/common.const';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'change-site-mode',
  standalone: true,
  imports: [TranslateModule, TooltipModule, ButtonModule],
  templateUrl: './change-site-mode.component.html',
  styleUrl: './change-site-mode.component.scss',
  providers: []
})
export class ChangeSiteModeComponent implements AfterViewInit {

  isLightMode = signal<boolean>(true);
  private document:Document = inject(DOCUMENT);
  private platformId:Object = inject(PLATFORM_ID);

  ngAfterViewInit(): void { 
    if (isPlatformBrowser(this.platformId)) {
      this.isLightMode.set(localStorage.getItem(LocalStorageKey.websiteMode) !== 'dark');
      if(!localStorage.getItem(LocalStorageKey.websiteMode)) {
        localStorage.setItem(LocalStorageKey.websiteMode, this.isLightMode() ?  'light' : 'dark')
      }
    }
    if (!this.isLightMode()) {
      this.document.body?.classList?.add('dark');
    }
    
  }

  handleChangeMode() {
    if (this.document.body && this.document.body?.classList) {
      this.document.body?.classList.toggle('dark');
    }
    this.isLightMode.set(!this.isLightMode());
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LocalStorageKey.websiteMode, this.isLightMode() ?  'light' : 'dark');
    }
  }
}
