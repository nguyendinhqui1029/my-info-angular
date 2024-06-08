import { Component, OnInit, inject, signal } from '@angular/core';
import { FooterService } from '@app/shared/services/footer.service';
import { RequestService } from '@app/shared/services/request.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ChangeSiteModeComponent } from '@app/components/site-mode/change-site-mode.component';
import { Button } from '@app/shared/models/button.model';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimeComponent ,TranslateModule, ChangeSiteModeComponent],
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
  buttons:Button[] = [{
    id: 'VIEW_DETAIL',
    label: 'view_detail',
    rounded: true
  }];
  
  images = [
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"]
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
