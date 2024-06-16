import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { Button } from '@app/shared/models/button.model';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { AspectRatioHeightPipe } from '@app/shared/pipes/aspect-ratio-height.pipe';

@Component({
  selector: 'q-left-content-card',
  standalone: true,
  imports: [PrimeComponent, ContainerChangeSizeDirective, AspectRatioHeightPipe],
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

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  imageWrapper:Record<string, ContainerSize> = {};

  handleImageWrapperWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.imageWrapper = element ;
    this.changeDetectorRef.detectChanges();
  }
}
