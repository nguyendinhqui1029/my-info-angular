import { ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FooterService } from '@app/shared/services/footer.service';
import { RequestService } from '@app/shared/services/request.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ChangeSiteModeComponent } from '@app/components/site-mode/change-site-mode.component';
import { Button } from '@app/shared/models/button.model';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Banner } from '@app/shared/models/banner.model';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { VideoComponent } from '@app/components/common/video/video.component';
import { GridContainerComponent } from '@app/components/common/grid-container/grid-container.component';
import { Card } from '@app/shared/models/card.model';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';
import { CarouselWrapperComponent } from '@app/components/common/carousel-wrapper/carousel-wrapper.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimeComponent, 
    TranslateModule, 
    ChangeSiteModeComponent, 
    VideoComponent,
    GridContainerComponent,
    ContainerSizePipe,
    CarouselWrapperComponent,
    ContainerChangeSizeDirective
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [FooterService]
})
export class HomeComponent implements OnInit {
  private subscription: Subscription | undefined;
  
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  requestService:RequestService = inject(RequestService);
  translateService: TranslateService = inject(TranslateService);
  footerService: FooterService = inject(FooterService);

  footer = this.footerService.getFooter().result;


  buttons:Button[] = [{
    id: 'VIEW_DETAIL',
    label: 'view_detail',
    rounded: true
  }];
  
  imageUrl = 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg'
  bannerItems: Banner[] = [];
  gridCard: Card[] = [];


  // Element Container 
  contentLayoutWrapper: Record<string,ContainerSize> = {};

  handleContentLayoutWrapperChangeSize(element: Record<string,ContainerSize>) {
    this.contentLayoutWrapper = element;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.subscription = this.translateService.onLangChange.subscribe(() => {
      this.footerService.refetchFooter();
    });
    this.bannerItems = [
      {
        id: 'Banner1',
        type: 'IMAGE',
        content: 'Content1',
        title: 'content title',
        source: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
        displayTime: 3000,
      },
      {
        id: 'Banner2',
        type: 'IMAGE',
        content: 'Content2',
        title: 'content title1',
        source: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/blue-endless-ocean-in-fog-free-photo.jpg',
        displayTime: 3000,
      },
      {
        id: 'Banner3',
        type: 'IMAGE',
        content: 'Content3',
        title: 'content title1',
        source: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/blue-endless-ocean-in-fog-free-photo.jpg',
        displayTime: 3000,
      }
    ];

    this.gridCard = [{
      id: 'Banner1',
      content: 'Content Content Content Content Content Content Content Content Content Content Content Content',
      title: 'content title Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content',
      thumbnail: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
      videoId: '_CVK7xYdVXU',
      type: 'VIDEO'
    }, {
      id: 'Banner1',
      content: 'Content1',
      title: 'content title',
      thumbnail: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
      type: 'IMAGE'
    }, {
      id: 'Banner1',
      content: 'Content2',
      title: 'content title',
      thumbnail: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
       type: 'IMAGE'
    }, {
      id: 'Banner1',
      content: 'Content3',
      title: 'content title',
      thumbnail: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
       type: 'IMAGE'
    }, {
      id: 'Banner1',
      content: 'Content4',
      title: 'content title',
      thumbnail: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
       type: 'IMAGE'
    }, {
      id: 'Banner1',
      content: 'Content5',
      title: 'content title',
      thumbnail: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
       type: 'IMAGE'
    }]
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
