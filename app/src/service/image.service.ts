import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ImageService {
  getUrlImageFull: Subject<string> = new Subject<string>();

  nextUrlImageFull(url) {
    this.getUrlImageFull.next(url);
  }
}