import { Component, ElementRef, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ACTION_SCROLL } from 'src/emun/action-scroll.enum';
import { MediaScreenService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { delay } from "rxjs/operators";
@Component({
  selector: 'scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit {
  mediaScreenService: MediaScreenService;
  iconName: string = 'keyboard_arrow_down';
  isShowButtonScrollToTop: boolean = true;
  actionScroll: any;
  constructor(private ls: LocatorService, private elementRef: ElementRef) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
  }

  ngOnInit(): void {
    this.mediaScreenService.notifyEvent.subscribe(data => {
      this.iconName = data.nameButton;
      this.actionScroll = data.action;
    });
  }

  toggleScroll() {
    switch (this.actionScroll) {
      case ACTION_SCROLL.down: {
        window.scrollTo({ top: this.elementRef.nativeElement.offsetTop, left: this.elementRef.nativeElement.offsetTop, behavior: "smooth" });
      }
        break;
      case ACTION_SCROLL.up: {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      }
        break;
    }
  }
}
