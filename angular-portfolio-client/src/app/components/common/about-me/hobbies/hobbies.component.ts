import { Component, Input, OnDestroy, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselWrapperComponent } from '@components/common/carousel-wrapper/carousel-wrapper.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Hobby } from '@app/shared/models/personal-info.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Banner } from '@app/shared/models/banner.model';
import { HobbyDetailDialogComponent } from '@app/components/dialogs/hobby-detail-dialog/hobby-detail-dialog.component';

@Component({
  selector: 'q-hobbies',
  standalone: true,
  imports: [CarouselWrapperComponent, TranslateModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss',
  providers: [DialogService, TranslateService]
})
export class HobbiesComponent implements OnDestroy {
  @Input({required: true}) hobby!: Hobby;

  private dialogService: DialogService = inject(DialogService);
  private translateService: TranslateService = inject(TranslateService);
  private dynamicDialogRef: DynamicDialogRef | undefined;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoWidth: false,
    autoHeight: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      }
    },
    nav: false
  }

  handleOpenDialogViewDetail(item: Banner) {
    this.dynamicDialogRef = this.dialogService.open(HobbyDetailDialogComponent, {
      header: this.translateService.instant('hobby_detail_header', { name: item.title }),
      width: '90vw',
      data: {
        id: item
      },
      contentStyle: { overflow: 'auto' },
      closeOnEscape: true,
      breakpoints: {
        '1360px': '90vw',
        '344px': '100vw'
      }
    });
  }

  ngOnDestroy() {
    if (this.dynamicDialogRef) {
      this.dynamicDialogRef.close();
    }
  }
}
