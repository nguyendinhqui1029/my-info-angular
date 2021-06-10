import { Component, OnInit } from '@angular/core';
import { TYPE_MENU } from 'src/emun/type-menu.enum';
import { MenuItem } from 'src/model/menu.model';
import { MenuService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  listMenuLeft: MenuItem[];
  menuService: MenuService;
  constructor(private ls: LocatorService) {
    this.menuService = this.ls.getService<MenuService>("menuService");
  }
  ngOnInit(): void {
    let mainMenu = this.menuService.getMenuByType(TYPE_MENU.LANGUAGE_MENU_LEFT_SOURCE);
    mainMenu.subscribe(menu => {
      this.listMenuLeft = menu.listItem;
    })
  }
}
