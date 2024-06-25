import { Component, Input } from '@angular/core';
import { Card } from '@app/shared/models/card.model';
import { VerticalImageCardComponent } from '@components/common/card/vertical-image-card/vertical-image-card.component';
import { VerticalVideoCardComponent } from '@components/common/card/vertical-video-card/vertical-video-card.component';

@Component({
  selector: 'q-grid-container',
  standalone: true,
  imports: [VerticalImageCardComponent, VerticalVideoCardComponent],
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss'
})
export class GridContainerComponent {
  @Input({required: true}) title: string = ''; 
  @Input({required: true}) items: Card[] = [];
  @Input({required: false}) titlePosition: 'left' | 'right' | 'center' = 'left'; 

}
