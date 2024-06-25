import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
 
  subscription!:Subscription;
  translateService = inject(TranslateService);
  title: Title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle(this.translateService.instant('author_name'));
    this.subscription = this.translateService.onLangChange.subscribe(() => this.title.setTitle(this.translateService.instant('author_name')));
  }


  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
