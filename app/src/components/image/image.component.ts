import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-custom',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageCustomComponent implements OnInit {
  @Input('url') url: string;
  @Input('isShow') isShow: boolean=false;
  @Input('width') width: number | undefined;
  @Input('height') height: number | undefined;

  constructor() {}

  ngOnInit(): void {}
}
