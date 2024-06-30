import { Component, Input } from '@angular/core';
import { DEFAULT_IMAGE } from '@app/constants/common.const';

@Component({
  selector: 'q-grid-card-image',
  standalone: true,
  imports: [],
  templateUrl: './grid-card-image.component.html',
  styleUrl: './grid-card-image.component.scss'
})
export class GridCardImageComponent {
  @Input({required: true}) items: string[] = [];
  defaultImage = DEFAULT_IMAGE;

}
