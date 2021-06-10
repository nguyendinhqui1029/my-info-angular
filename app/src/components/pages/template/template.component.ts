import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FooterAminComponent } from 'src/components/admin';
import { FooterComponent } from 'src/components/footer/footer.component';
import { ROLE } from 'src/emun/role.enum';
import { TYPE_MENU } from 'src/emun/type-menu.enum';
import { MenuItem } from 'src/model/menu.model';
import { DynamicComponentService, MediaScreenService, MenuService, NavigationService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'frames',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  listItem: MenuItem[] = [];
  minHeightDrawer: string;
  isDeviceXS: boolean = false;
  @ViewChild('drawer', { static: true }) elementRef: ElementRef;
  @ViewChild('containerFooter', { static: true, read: ViewContainerRef }) containerFooter: ViewContainerRef;

  mediaScreenService: MediaScreenService;
  navigationService: NavigationService;
  dynamicComponentService: DynamicComponentService;
  menuService: MenuService;

  constructor(private ls: LocatorService, private cd: ChangeDetectorRef, @Inject(DOCUMENT) private document) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.navigationService = this.ls.getService<NavigationService>("navigationService");
    this.dynamicComponentService = this.ls.getService<DynamicComponentService>("dynamicComponentService");
    this.menuService = this.ls.getService<MenuService>("menuService");

    this.mediaScreenService.openDrawerEvent.subscribe(listMenu => {
      this.listItem = listMenu;
      (this.elementRef as any).toggle();
    });

    this.mediaScreenService.getDevice().subscribe(result => {
      this.minHeightDrawer = this.getMinHeightDrawerContent();
      this.isDeviceXS = result.mqAlias !== 'xs' ? false : true;
      if (!this.isDeviceXS && (this.elementRef as any)._animationState === 'open') {
        (this.elementRef as any).toggle();
      }
    });
  }

  getMinHeightDrawerContent() {
    const heightFooter = this.document.querySelector("#footer-container").offsetHeight;
    const heightMenu = this.document.querySelector(".mat-toolbar-row").offsetHeight;
    return `${Math.abs(window.innerHeight - (heightFooter + heightMenu))}px`;
  }

  ngOnInit(): void {
    let mainMenu = this.menuService.getMenuByType(TYPE_MENU.MENU_TOP);
    switch (this.navigationService.getPathParent()) {
      case "admin": {
        this.dynamicComponentService.renderComponent(FooterAminComponent, this.containerFooter);
        mainMenu.subscribe(menu => {
          menu.listItem.forEach(item => {
            item.showOrHidden = false;
            if (item.role.indexOf(ROLE.ADMIN) > -1) {
              item.showOrHidden = true;
            }
          });
          this.listItem = menu.listItem;
        })
      }
        break;
      default: {
        this.dynamicComponentService.renderComponent(FooterComponent, this.containerFooter);
        mainMenu.subscribe(menu => {
          menu.listItem.forEach(item => {
            item.showOrHidden = false;
            if (item.role.indexOf(ROLE.CUSTOMER) > -1) {
              item.showOrHidden = true;
            }
          });
          this.listItem = menu.listItem;
        });
      }
    }
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
