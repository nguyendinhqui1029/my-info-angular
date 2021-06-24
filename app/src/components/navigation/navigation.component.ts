import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/model/menu.model';
import { AuthService, NavigationService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { MediaScreenService } from 'src/service/media-screen.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input('listItem') listItem: MenuItem[];
  isDeviceXS: boolean = false;
  mediaScreen: Subscription;
  userInfoSub: Subscription;
  userInfo: any;
  // Service 
  mediaScreenService: MediaScreenService;
  navigationService: NavigationService;
  authService: AuthService;
  constructor(private ls: LocatorService) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.navigationService = this.ls.getService<NavigationService>('navigationService');
    this.authService = this.ls.getService<AuthService>('authService');
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.mediaScreen = this.mediaScreenService.getDevice().subscribe(result => {
      this.isDeviceXS = result.mqAlias === 'xs' ? true : false;
    });

    this.userInfoSub = this.authService.infoUser.subscribe(user => {
      if (user) {
        this.userInfo = user;
      }
      this.listItem.forEach((item) => {
        switch (item.url) {
          case 'admin':
          case 'logout': item.showOrHidden = this.authService.isLogin;
            break;
          case 'login':
            item.showOrHidden = !this.authService.isLogin;
            break;
        }
      });
    });
  }


  openDrawer() {
    this.mediaScreenService.toggleDrawer(this.listItem);
  }

  ngOnDestroy(): void {
    this.mediaScreen.unsubscribe();
    this.userInfoSub.unsubscribe();
  }
}
