import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FooterService } from '@app/shared/services/footer.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'q-footer',
  standalone: true,
  imports: [TranslateModule, JsonPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [FooterService]
})
export class FooterComponent implements OnInit, OnDestroy{
  translateService: TranslateService = inject(TranslateService);
  footerService: FooterService = inject(FooterService);
  footerInfo = this.footerService.getFooter().result;
  
  private subscription: Subscription | undefined;

  
  ngOnInit() {
    this.subscription = this.translateService.onLangChange.subscribe(() => {
      this.footerService.refetchFooter();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
