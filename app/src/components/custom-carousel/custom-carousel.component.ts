import { Component, Input, OnInit } from '@angular/core';
import { Slides } from 'src/model/slides';

@Component({
  selector: 'custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss']
})
export class CustomCarouselComponent implements OnInit {
  @Input("listSlides") listSlides: Slides[];
  @Input("marginTop") marginTop: string;
  @Input("marginBottom") marginBottom: string;
  constructor() {

  }

  ngOnInit(): void {
    this.marginTop = `${this.marginTop}px`;
    this.marginBottom = `${this.marginBottom}px`;
  }
}
