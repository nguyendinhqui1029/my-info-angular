import { Directive, ElementRef, HostListener } from '@angular/core';
import { ACTION_SCROLL } from 'src/emun/action-scroll.enum';
import { MediaScreenService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Directive({
  selector: '[scroller]'
})
export class ScrollerDirective {

  mediaScreenService: MediaScreenService;
  constructor(private el: ElementRef, private ls: LocatorService) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
  }
  @HostListener("window:load", [])
  onWindowLoad() {
    window.scrollTo(0, 0);
    this.mediaScreenService.notifyEventScroll({ nameButton: 'keyboard_arrow_down', action: ACTION_SCROLL.down });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const scrollHeight = this.el.nativeElement.scrollHeight;
    if (window.scrollY > (scrollHeight - window.scrollY) / 2) {
      this.mediaScreenService.notifyEventScroll({ nameButton: 'keyboard_arrow_up', action: ACTION_SCROLL.up });
    } else {
      this.mediaScreenService.notifyEventScroll({ nameButton: 'keyboard_arrow_down', action: ACTION_SCROLL.down });
    }
  }
}