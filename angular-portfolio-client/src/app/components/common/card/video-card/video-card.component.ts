import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { Button } from '@app/shared/models/button.model';
import { ContainerSize } from '@app/shared/models/container-size.mode';

@Component({
  selector: 'q-video-card',
  standalone: true,
  imports: [PrimeComponent, ContainerChangeSizeDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {
  @Input() isDisplayUI!: boolean;
  @Input({required: true}) videoUrl!: string;
  @Input({required: true}) content!: string;
  @Input({required: true}) title!: string;
  @Input({required: false}) buttonName!: string;
  @Input({required: false}) buttons!: Button[];

  @Output() clickEvent = new EventEmitter<string>();

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef)
  
  videoWrapper!: ContainerSize;

  handleVideoCardWrapperChangeSize(element: ContainerSize) {
    this.videoWrapper = element;
    this.changeDetectorRef.detectChanges();
  }
}
