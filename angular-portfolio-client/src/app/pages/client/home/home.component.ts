import { Component, OnInit, inject, signal } from '@angular/core';
import { FooterService } from '@app/shared/services/footer.service';
import { RequestService } from '@app/shared/services/request.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ChangeSiteModeComponent } from '@app/components/site-mode/change-site-mode.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, JsonPipe, ChangeSiteModeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [FooterService]
})
export class HomeComponent implements OnInit {
  private subscription: Subscription | undefined;
  
  requestService:RequestService = inject(RequestService);
  translateService: TranslateService = inject(TranslateService);
  footerService: FooterService = inject(FooterService);



  toggleLang = signal<boolean>(false);
  footer = this.footerService.getFooter().result;

  ngOnInit() {
    this.subscription = this.translateService.onLangChange.subscribe(() => {
      this.footerService.refetchFooter();
    });
  }

  change() {
    this.toggleLang.set(!this.toggleLang());
    this.translateService.use(this.toggleLang() ? 'en': 'vi');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
