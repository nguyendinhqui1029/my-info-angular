import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Button } from '@app/shared/models/button.model';

@Component({
  selector: 'q-circle-image-card',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './circle-image-card.component.html',
  styleUrl: './circle-image-card.component.scss'
})
export class CircleImageCardComponent {
  @Input() isDisplayUI!: boolean;
  @Input({required: true}) images!: string[];
  @Input({required: true}) content!: string;
  @Input({required: true}) title!: string;
  @Input({required: false}) buttonName!: string;
  @Input({required: false}) buttons!: Button[];

  @Output() clickEvent = new EventEmitter<string>();

}
