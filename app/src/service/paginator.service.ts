import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorService {
  getListDataPaginator: Subject<any> = new Subject<any>();

  nextListDataPaginator(dataListPaginator: any[], keyListNeedReload: string) {
    this.getListDataPaginator.next({ dataList: dataListPaginator, key: keyListNeedReload });
  }
}