import { Component, OnInit } from '@angular/core';
import { ROLE } from 'src/emun/role.enum';
import { TYPE_MENU } from 'src/emun/type-menu.enum';
import { MenuItem } from 'src/model/menu.model';
import { MediaScreenService, MenuService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {
  listMenuLeft: MenuItem[];
  isDeviceXS: boolean = false;
  mediaScreenService: MediaScreenService;
  menuService: MenuService;
  constructor(private ls: LocatorService) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.menuService = this.ls.getService<MenuService>("menuService");
  }

  ngOnInit(): void {
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });

    let mainMenu = this.menuService.getMenuByType(TYPE_MENU.ADMIN_MENU_LEFT);
    mainMenu.subscribe(menu => {
      menu.listItem.forEach(item => {
        item.showOrHidden = false;
        if (item.role.indexOf(ROLE.ADMIN) > -1) {
          item.showOrHidden = true;
        }
        if (item.hasOwnProperty('children') && item.children.length > 0) {
          item.children.forEach(childrenItem => {
            if (childrenItem.role.indexOf(ROLE.ADMIN) > -1) {
              childrenItem.showOrHidden = true;
            } else {
              childrenItem.showOrHidden = false;
            }
          });
        }
      });
      this.listMenuLeft = menu.listItem;
    })
  }
}
