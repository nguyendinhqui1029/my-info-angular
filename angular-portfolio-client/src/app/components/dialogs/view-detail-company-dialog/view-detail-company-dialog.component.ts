import { Component, inject } from '@angular/core';
import { GridCardImageComponent } from '@app/components/common/card/grid-card-image/grid-card-image.component';
import { CarouselWrapperComponent } from '@app/components/common/carousel-wrapper/carousel-wrapper.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Banner } from '@app/shared/models/banner.model';
import { CompanyService } from '@app/shared/services/company.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-view-detail-company-dialog',
  standalone: true,
  imports: [PrimeComponent,CarouselWrapperComponent, GridCardImageComponent],
  templateUrl: './view-detail-company-dialog.component.html',
  styleUrl: './view-detail-company-dialog.component.scss'
})
export class ViewDetailCompanyDialogComponent {
  private dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  
  private companyService: CompanyService = inject(CompanyService);
  company = this.companyService.getCompanyDetailWithLanguage(this.dialogConfig.data.id).result;
  activities: Banner[] = [
    {
      "id": "Banner1",
      "type": "IMAGE_VERTICAL",
      "content": "Company Trip",
      "title": "Company trip with smilegate vietname",
      "source": "https://assets.topdev.vn/images/2024/06/07/TopDev-80d36a3db5c218eade7dbaf06ca69d9a-1717746089.png"
    },
    {
      "id": "Banner2",
      "type": "IMAGE_VERTICAL",
      "content": "Football Team",
      "title": "Football Team",
      "source": "https://assets.topdev.vn/images/2024/06/07/TopDev-4ce1c093139e3ead853d8d8663b566a6-1717746090.png"
    },
    {
      "id": "Banner3",
      "type": "IMAGE_VERTICAL",
      "content": "Beer time",
      "title": "Beer time",
      "source": "https://assets.topdev.vn/images/2024/06/07/TopDev-bb9f0cd89bcdab8696f41b8098bc5cd8-1717746090.png"
    }
  ]; // TODO call api

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoWidth: false,
    autoHeight: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<<', '>>'],
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
    nav: true
  }
}
