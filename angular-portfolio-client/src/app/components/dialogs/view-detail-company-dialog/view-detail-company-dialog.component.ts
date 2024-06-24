import { Component, inject } from '@angular/core';
import { CarouselWrapperComponent } from '@app/components/common/carousel-wrapper/carousel-wrapper.component';
import { CardTypeComponent } from '@app/constants/common.const';
import { Banner } from '@app/shared/models/banner.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-view-detail-company-dialog',
  standalone: true,
  imports: [CarouselWrapperComponent],
  templateUrl: './view-detail-company-dialog.component.html',
  styleUrl: './view-detail-company-dialog.component.scss'
})
export class ViewDetailCompanyDialogComponent {
  private dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoWidth: false,
    autoHeight: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<<', '>>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }
  bannerItems: Banner[] = [
    {
      id: 'Banner1',
      type: CardTypeComponent.imageVerticalCard,
      content: 'Content1',
      title: 'content title',
      source: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
      displayTime: 3000,
    },
    {
      id: 'Banner2',
      type: CardTypeComponent.imageVerticalCard,
      content: 'Content2',
      title: 'content title1',
      source: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/blue-endless-ocean-in-fog-free-photo.jpg',
      displayTime: 3000,
    },
    {
      id: 'Banner3',
      type: CardTypeComponent.imageVerticalCard,
      content: 'Content3',
      title: 'content title1',
      source: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/blue-endless-ocean-in-fog-free-photo.jpg',
      displayTime: 3000,
    }
  ];
}
