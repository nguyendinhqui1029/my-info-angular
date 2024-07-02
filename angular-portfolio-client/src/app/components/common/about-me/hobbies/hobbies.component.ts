import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselWrapperComponent } from '@components/common/carousel-wrapper/carousel-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { Hobby } from '@app/shared/models/personal-info.model';

@Component({
  selector: 'q-hobbies',
  standalone: true,
  imports: [CarouselWrapperComponent, TranslateModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss'
})
export class HobbiesComponent {
  @Input({required: true}) hobby!: Hobby;

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
}
