import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class MediaScreenService {
  backgroundChange: Subject<string> = new Subject<string>();
  openDrawerEvent: Subject<any[]> = new Subject<any[]>();
  notifyEvent: Subject<any> = new Subject<any>();
  constructor(private mediaObservver: MediaObserver) {

  }

  getDevice() {
    return this.mediaObservver.media$;
  }

  notifyEventScroll(value) {
    this.notifyEvent.next(value);
  }
  toggleDrawer(menu: any[]) {
    this.openDrawerEvent.next(menu);
  }

  changeBackgroundScreen(color) {
    this.backgroundChange.next(color);
  }

  getBackgroundAndTextColorDefault() {
    return { 'background-color': environment.background, 'color': environment.color };
  }
}