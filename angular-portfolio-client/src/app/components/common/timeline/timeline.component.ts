import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { TimelineCard } from '@app/shared/models/timeline-card.model';
import { AspectRatioHeightPipe } from '@app/shared/pipes/aspect-ratio-height.pipe';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';

@Component({
  selector: 'q-timeline',
  standalone: true,
  imports: [PrimeComponent, ContainerChangeSizeDirective, ContainerSizePipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @Input({required: true}) items: TimelineCard[] = []; // pi pi-trophy
  @Output() eventClick = new EventEmitter<string>();

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  cardTimeLineWrapper: Record<string, ContainerSize> = {};

  handleCardTimeLineWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.cardTimeLineWrapper = element;
    this.changeDetectorRef.detectChanges();
  }
}
