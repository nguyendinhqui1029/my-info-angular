import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Button } from '@app/shared/models/button.model';

@Component({
  selector: 'q-left-content-card',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './left-content-card.component.html',
  styleUrl: './left-content-card.component.scss'
})
export class LeftContentCardComponent {
  @Input() isDisplayUI!: boolean;
  @Input({required: true}) imageUrl!: string;
  @Input({required: true}) content!: string;
  @Input({required: true}) title!: string;
  @Input({required: false}) buttonName!: string;
  @Input({required: false}) buttons!: Button[];

  @Output() clickEvent = new EventEmitter<string>();
}
