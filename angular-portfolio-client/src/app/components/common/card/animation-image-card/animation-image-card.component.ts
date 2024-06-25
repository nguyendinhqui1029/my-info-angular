import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Button } from '@app/shared/models/button.model';

@Component({
  selector: 'q-animation-image-card',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './animation-image-card.component.html',
  styleUrl: './animation-image-card.component.scss'
})
export class AnimationImageCardComponent {
  @Input() isDisplayUI!: boolean;
  @Input({required: true}) imageUrl!: string;
  @Input({required: true}) content!: string;
  @Input({required: false}) date!: string;
  @Input({required: true}) title!: string;
  @Input({required: false}) buttons!: Button[];

  @Output() clickEvent = new EventEmitter<string>();

}
