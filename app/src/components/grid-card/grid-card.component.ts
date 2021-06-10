import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridCard } from 'src/model/grid-card.model';
import { MediaScreenService, NavigationService, PaginatorService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { DialogCustomComponent } from '../dialog/dialog.component';

@Component({
  selector: 'grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit {
  @Input('dataGridCard') dataGridCard: GridCard;
  @Input('numberItemPage') numberItemPage: number = 5;
  isDeviceXS: boolean = false;
  mediaScreenService: MediaScreenService;
  paginatorService: PaginatorService;
  listDataGridCardAfterPagination: any[] = [];
  constructor(private ls: LocatorService) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.paginatorService = this.ls.getService<PaginatorService>("paginatorService");
  }

  ngOnInit(): void {
    this.paginatorService.getListDataPaginator.subscribe(dataAfterPaginator => {
      this.listDataGridCardAfterPagination[dataAfterPaginator.key] = dataAfterPaginator.dataList;
    });
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });
  }
}