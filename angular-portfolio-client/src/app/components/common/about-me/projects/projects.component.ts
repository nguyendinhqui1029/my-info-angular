import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Project } from '@app/shared/models/personal-info.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselWrapperComponent } from '@components/common/carousel-wrapper/carousel-wrapper.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectDetailDialogComponent } from '@app/components/dialogs/project-detail-dialog/project-detail-dialog.component';
import { Banner } from '@app/shared/models/banner.model';

@Component({
  selector: 'q-projects',
  standalone: true,
  imports: [CarouselWrapperComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers:  [TranslateService, DialogService]
})
export class ProjectsComponent implements OnDestroy{
  @Input({required: true}) project!: Project;

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
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  }
  
  handleViewDetail(item: Banner) {
    this.dynamicDialogRef = this.dialogService.open(ProjectDetailDialogComponent, {
      header: this.translateService.instant('project_detail_header', { name: item.title }),
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
