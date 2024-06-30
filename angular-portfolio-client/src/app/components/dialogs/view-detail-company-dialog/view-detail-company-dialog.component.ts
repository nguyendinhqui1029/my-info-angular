import { Component, inject } from '@angular/core';
import { GridCardImageComponent } from '@app/components/common/card/grid-card-image/grid-card-image.component';
import { CarouselWrapperComponent } from '@app/components/common/carousel-wrapper/carousel-wrapper.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
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
  company = this.companyService.getCompanyDetail(this.dialogConfig.data.id).result;
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
