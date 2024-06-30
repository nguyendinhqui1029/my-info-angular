import { Component, Input } from '@angular/core';
import { Project } from '@app/shared/models/personal-info.model';
import { TranslateModule } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselWrapperComponent } from '@components/common/carousel-wrapper/carousel-wrapper.component';

@Component({
  selector: 'q-projects',
  standalone: true,
  imports: [CarouselWrapperComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  @Input({required: true}) project!: Project;

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
  handleViewDetail(idProject: string) {
    console.log(idProject);
  }
}
