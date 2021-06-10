import { Component, OnInit } from '@angular/core';
import { TYPE_MENU } from 'src/emun/type-menu.enum';
import { MenuItem } from 'src/model/menu.model';
import { MenuService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  listMenu: MenuItem[];
  menuService: MenuService;
  constructor(private ls: LocatorService) {
    this.menuService = this.ls.getService<MenuService>("menuService");
  }

  ngOnInit(): void {
    let mainMenu = this.menuService.getMenuByType(TYPE_MENU.LOGIN_MENU_LEFT);
    mainMenu.subscribe(menu => {
      this.listMenu = menu.listItem;
    });
  }
}
