import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Banner } from '@app/shared/models/banner.model';

@Component({
  selector: 'q-content-overlap-image-card',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './content-overlap-image-card.component.html',
  styleUrl: './content-overlap-image-card.component.scss'
})
export class ContentOverlapImageCardComponent {
  @Input({ required: true }) item!: Banner;
  @Input({ required: false }) buttonName: string="detail";
  @Output() eventClick = new EventEmitter<Banner>();
}
