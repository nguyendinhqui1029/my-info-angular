import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-custom',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageCustomComponent implements OnInit {
  @Input("url") url: string;
  @Input("ngClass") ngClass: any = {};
  @Input("containerId") containerId: string;
  @Input("calHeight") calHeight: boolean = true;
  heightImage: number;
  widthImage: number;
  constructor(@Inject(DOCUMENT) private document, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {

  }

  @HostListener("window:resize")
  onResize() {
    this.setHeightAndWidthImage();
  }

  setHeightAndWidthImage() {
    if (this.document.querySelector(`#${this.containerId}`)) {
      if (this.widthImage !== this.document.querySelector(`#${this.containerId}`).offsetWidth) {
        this.widthImage = this.document.querySelector(`#${this.containerId}`).offsetWidth;
        this.heightImage = this.calHeight ? (this.widthImage / 1.69) : this.document.querySelector(`#${this.containerId}`).offsetHeight;
      }
    }
  }

  ngAfterViewChecked(): void {
    this.setHeightAndWidthImage();
    this.cd.detectChanges();
  }
}
