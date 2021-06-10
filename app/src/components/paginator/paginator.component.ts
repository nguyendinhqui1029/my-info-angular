import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MODE_PAGINATOR } from 'src/emun/mode-paginator.enum';
import { PaginatorService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit {
  @Input("listItem") listItem: any[] = [];
  @Input("numberItemPage") numberItemPage: number = 5;
  @Input("keyListReload") keyListReload: string;
  @Input("mode") mode: string = MODE_PAGINATOR.LOOP;
  currentItem: number = 0;
  paginatorService: PaginatorService;

  constructor(private ls: LocatorService) {
    this.paginatorService = this.ls.getService<PaginatorService>("paginatorService");
  }

  ngAfterViewInit(): void {
    this.paginatorService.nextListDataPaginator(this.getItemForNewPost(), this.keyListReload);
  }

  loadNewItem(action: string) {
    this.paginatorService.nextListDataPaginator(this.getItemForNewPost(action), this.keyListReload);
  }

  getItemForNewPost(action?: string) {
    let listDataPaginator = [];
    switch (action) {
      case 'next': this.currentItem += this.numberItemPage * 1;
        break;
      case 'back': this.currentItem -= this.numberItemPage * 1;
        break;
    }


    if (this.listItem.length < (this.currentItem + this.numberItemPage * 1)) {
      const numItemSelect = (this.currentItem + this.numberItemPage * 1) - this.listItem.length;
      const listItemStart = this.listItem.slice(0, numItemSelect);
      if (this.mode === MODE_PAGINATOR.LOOP) {
        listDataPaginator = this.listItem.slice((this.listItem.length - (this.numberItemPage * 1 - numItemSelect)) - 1, this.listItem.length - 1).concat(listItemStart);
      } else {
        if ((this.numberItemPage * 1) >= this.listItem.length) {
          listDataPaginator = this.listItem;
        } else {
          listDataPaginator = this.listItem.slice((this.listItem.length - (this.numberItemPage * 1 - numItemSelect)) - 1, this.listItem.length - 1);
        }

      }
    } else {
      listDataPaginator = this.listItem.slice(this.currentItem, (this.currentItem + this.numberItemPage * 1));
    }
    return listDataPaginator;
  }
}
