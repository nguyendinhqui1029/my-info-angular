import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject, signal } from '@angular/core';

@Component({
  selector: 'change-site-mode',
  standalone: true,
  imports: [],
  templateUrl: './change-site-mode.component.html',
  styleUrl: './change-site-mode.component.scss',
  providers: []
})
export class ChangeSiteModeComponent implements AfterViewInit {

  private isLight = signal<boolean>(true);
  private document:Document = inject(DOCUMENT);

  ngAfterViewInit(): void { 
    if (!this.isLight()) {
    this.document.body?.classList?.toggle('dark');
    }
  }

  changeMode() {
    this.isLight.set(!this.isLight());
    if (this.document.body && this.document.body?.classList) {
      this.document.body?.classList.toggle('dark');
    }
  }
}
