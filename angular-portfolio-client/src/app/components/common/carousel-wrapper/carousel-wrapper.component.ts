import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ContentOverlapImageCardComponent } from '@components/common/card/content-overlap-image-card/content-overlap-image-card.component';
import { Banner } from '@app/shared/models/banner.model';
import { HammerModule } from '@angular/platform-browser';
import { IGX_CAROUSEL_DIRECTIVES } from 'igniteui-angular';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';
import { ChangeSiteModeComponent } from '@app/components/site-mode/change-site-mode.component';
import { AspectRatioHeightPipe } from '@app/shared/pipes/aspect-ratio-height.pipe';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { getHeightAspectRatioVideo } from '@app/shared/utils/common.util';

@Component({
  selector: 'q-carousel-wrapper',
  standalone: true,
  imports: [
    HammerModule, IGX_CAROUSEL_DIRECTIVES,
    NgFor,
    ContentOverlapImageCardComponent,
    ContainerSizePipe,
    AspectRatioHeightPipe,
    ContainerChangeSizeDirective,
  ],
  templateUrl: './carousel-wrapper.component.html',
  styleUrl: './carousel-wrapper.component.scss'
})
export class CarouselWrapperComponent {
  @Input({ required: true }) bannerItems: Banner[] = [];

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  carouselWrapper: Record<string, ContainerSize> = {};
  maxHeightCarouselWrapper: string = '30rem';
  handleCarouselWrapperChangeSize(element: Record<string, ContainerSize>) {
    const MAX_HEIGHT = 480;
    this.carouselWrapper = element;
    console.log(this.carouselWrapper?.['832'].height)
    const maxWidth = this.carouselWrapper?.['832'].width + this.carouselWrapper?.['832'].paddingLeft + this.carouselWrapper?.['832'].paddingRight;
    this.maxHeightCarouselWrapper = this.carouselWrapper?.['832'].width >= (MAX_HEIGHT * 16 / 9) ? '30rem' : `${getHeightAspectRatioVideo(maxWidth) / 16}rem`
    this.changeDetectorRef.detectChanges();
  }
}
