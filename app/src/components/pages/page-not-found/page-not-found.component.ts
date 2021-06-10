import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private ls: LocatorService) { }

  navigateTo(path) {
    this.ls.getService<NavigationService>('navigationService').navigateTo(path);
  }

  navigateBack() {
    this.ls.getService<NavigationService>('navigationService').navigateBack();
  }
  ngOnInit(): void { }
}
