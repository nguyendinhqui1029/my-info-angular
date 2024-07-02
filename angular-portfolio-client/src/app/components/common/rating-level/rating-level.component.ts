import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { CommonOption } from '@app/shared/models/common-option.model';
import { RatingComponent } from '@components/common/rating/rating.component';

@Component({
  selector: 'q-rating-level',
  standalone: true,
  imports: [PrimeComponent, RatingComponent],
  templateUrl: './rating-level.component.html',
  styleUrl: './rating-level.component.scss',
})
export class RatingLevelComponent {
 @Input({required: true}) title!: string;
 @Input({required: true}) items: CommonOption[] = [];

 @Output() eventClick = new EventEmitter<CommonOption>();
}
