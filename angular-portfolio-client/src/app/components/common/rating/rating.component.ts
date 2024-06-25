import { Component, Input } from '@angular/core';

@Component({
  selector: 'q-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input({required: true}) value: number = 0;
  @Input({required: false}) unit: string = '%';
  @Input({required: false}) maxValue: number = 100;
}
