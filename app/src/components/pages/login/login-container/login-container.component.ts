import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TYPE_MENU } from 'src/emun/type-menu.enum';
import { MenuItem } from 'src/model/menu.model';
import { DynamicComponentService, MediaScreenService, MenuService, NavigationService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';


@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {
  @Input("listMenu") listMenu: MenuItem[];
  isDeviceXS: boolean = false;
  mediaScreenService: MediaScreenService;
  navigationService: NavigationService;


  @ViewChild('container', { static: true, read: ViewContainerRef }) containe: ViewContainerRef;

  constructor(private ls: LocatorService, private cd: ChangeDetectorRef) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.navigationService = this.ls.getService<NavigationService>("navigationService");

  }

  ngOnInit(): void {
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
