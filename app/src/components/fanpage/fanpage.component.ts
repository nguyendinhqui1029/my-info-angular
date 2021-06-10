import { DomSanitizer } from '@angular/platform-browser';

import { ChangeDetectorRef, Component, HostListener, Inject, Input, OnInit, } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fanpage-facebook',
  templateUrl: './fanpage.component.html',
  styleUrls: ['./fanpage.component.scss']
})
export class FanpageFacebookComponent implements OnInit {
  src: any;
  width: number;
  height: number = 400;

  @Input("containerId") containeId: string;
  constructor(private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.setWidthFanpage();
  }

  @HostListener("window:resize")
  onResize() {
    this.setWidthFanpage();
  }

  setWidthFanpage() {
    if (this.document.querySelector(`#${this.containeId}`)) {
      if (this.width !== (this.document.querySelector(`#${this.containeId}`).offsetWidth - 5)) {
        this.width = (this.document.querySelector(`#${this.containeId}`).offsetWidth - 5);
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FNguy%E1%BB%85n-Qui-111730567625492&tabs=timeline&width=${this.width}&height=${this.height}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`);
      }
    }
  }

  ngAfterViewChecked(): void {
    this.setWidthFanpage();
    this.cd.detectChanges();
  }
}
