import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['vi', 'en']);
    if (localStorage.getItem("lang")) {
      translate.setDefaultLang(localStorage.getItem("lang"))
    } else {
      translate.setDefaultLang('vi');
      localStorage.setItem("lang", "vi");
    }
  }
}
