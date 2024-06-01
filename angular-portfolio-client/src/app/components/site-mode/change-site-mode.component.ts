import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
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

  isLightMode = signal<boolean>(localStorage.getItem(LocalStorageKey.websiteMode) !== 'dark');
  private document:Document = inject(DOCUMENT);

  ngAfterViewInit(): void { 
    if (!this.isLightMode()) {
      this.document.body?.classList?.add('dark');
    }
    if(!localStorage.getItem(LocalStorageKey.websiteMode)) {
      localStorage.setItem(LocalStorageKey.websiteMode, this.isLightMode() ?  'light' : 'dark')
    }
  }

  handleChangeMode() {
    if (this.document.body && this.document.body?.classList) {
      this.document.body?.classList.toggle('dark');
    }
    this.isLightMode.set(!this.isLightMode());
    localStorage.setItem(LocalStorageKey.websiteMode, this.isLightMode() ?  'light' : 'dark');
  }
}
