import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
    menuTopHeightSubject = new Subject<number>();
    setHeight(height: number) {
        const MARGIN_TOP_CONTAINER = 48;
        this.menuTopHeightSubject.next(height + MARGIN_TOP_CONTAINER);
    }
}
