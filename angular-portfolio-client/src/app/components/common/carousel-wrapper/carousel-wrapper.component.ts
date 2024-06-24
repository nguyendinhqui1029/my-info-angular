import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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
export class CarouselWrapperComponent {
  @Input({ required: true }) bannerItems: Banner[] = [];
  @Input({ required: false }) customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoHeight: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  };
  @Input({ required: false }) isShowNavigation: boolean = false;
  @Input({ required: false }) interval: number = 3000;

  @Output() eventClick = new EventEmitter<string>();

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  cardTypeComponent = CardTypeComponent;

  // Element Container 
  carouselWrapper: Record<string, ContainerSize> = {};
  maxHeightCarouselWrapper: string = '30rem';

  handleCarouselWrapperChangeSize(element: Record<string, ContainerSize>) {
    const MAX_HEIGHT = 480;
    this.carouselWrapper = element;
    const maxWidth = this.carouselWrapper?.['832'].width + this.carouselWrapper?.['832'].paddingLeft + this.carouselWrapper?.['832'].paddingRight;
    this.maxHeightCarouselWrapper = this.carouselWrapper?.['832'].width >= (MAX_HEIGHT * 16 / 9) ? '30rem' : `${getHeightAspectRatioVideo(maxWidth) / 16}rem`
    this.changeDetectorRef.detectChanges();
  }
}
