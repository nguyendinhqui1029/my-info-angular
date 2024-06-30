import { NgFor } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { ContentOverlapImageCardComponent } from '@components/common/card/content-overlap-image-card/content-overlap-image-card.component';
import { Banner } from '@app/shared/models/banner.model';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';
import { AspectRatioHeightPipe } from '@app/shared/pipes/aspect-ratio-height.pipe';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { getHeightAspectRatioVideo } from '@app/shared/utils/common.util';
import { CardTypeComponent } from '@app/constants/common.const';
import { VerticalImageCardComponent } from '@components/common/card/vertical-image-card/vertical-image-card.component';
import { VerticalVideoCardComponent } from '@components/common/card/vertical-video-card/vertical-video-card.component';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'q-carousel-wrapper',
  standalone: true,
  imports: [
    NgFor,
    ContentOverlapImageCardComponent,
    VerticalImageCardComponent,
    VerticalVideoCardComponent,
    ContainerSizePipe,
    AspectRatioHeightPipe,
    ContainerChangeSizeDirective,
    CarouselModule
  ],
  templateUrl: './carousel-wrapper.component.html',
  styleUrl: './carousel-wrapper.component.scss'
})
export class CarouselWrapperComponent implements  OnChanges, OnInit {
  @Input({ required: true }) bannerItems: Banner[] = [];
  @Input({ required: false }) customOptions!: OwlOptions;
  @Input({ required: false }) isCalculateHeight: boolean = false;

  @Output() eventClick = new EventEmitter<string>();

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  cardTypeComponent = CardTypeComponent;
  carouselOptions!: OwlOptions;

  // Element Container 
  carouselWrapper: Record<string, ContainerSize> = {};

  maxHeightCarouselWrapper: string = '30rem';

  handleCarouselWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.carouselWrapper = element;
    if(this.isCalculateHeight) {
      const MAX_HEIGHT = 480;
      const maxWidth = this.carouselWrapper?.['832'].width + this.carouselWrapper?.['832'].paddingLeft + this.carouselWrapper?.['832'].paddingRight;
      this.maxHeightCarouselWrapper = this.carouselWrapper?.['832'].width >= (MAX_HEIGHT * 16 / 9) ? '30rem' : `${getHeightAspectRatioVideo(maxWidth) / 16}rem`
      this.changeDetectorRef.detectChanges();
      return;
    } 
    this.maxHeightCarouselWrapper = 'fit-content';
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['customOptions']?.currentValue) {
      this.carouselOptions = changes['customOptions'].currentValue;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.carouselOptions = this.customOptions || {
        center:true,
        autoWidth: false,
        loop: true,
        autoplay: true,
        autoHeight: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        margin: 10,
        responsive: {
          0: {
            items: 1,
          }
        },
        nav: false
      };
    }, 0);
  }
}
