import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { Banner } from '@app/shared/models/banner.model';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { AspectRatioHeightPipe } from '@app/shared/pipes/aspect-ratio-height.pipe';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';

@Component({
  selector: 'q-vertical-video-card',
  standalone: true,
  imports: [PrimeComponent, AspectRatioHeightPipe, ContainerChangeSizeDirective, ContainerSizePipe],
  templateUrl: './vertical-video-card.component.html',
  styleUrl: './vertical-video-card.component.scss'
})
export class VerticalVideoCardComponent {
 @Input({required: true}) id!: string;
 @Input({required: true}) videoId: string = ''; 
 @Input({required: false}) date: string = ''; 
 @Input({required: true}) content: string = ''; 
 @Input({required: true}) title: string = ''; 

 @Output() eventClick = new EventEmitter<Banner>();

 private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef)
  
 verticalVideoCard!: Record<string,ContainerSize>;

 handleVerticalVideoCardChangeSize(element: Record<string,ContainerSize>) {
   this.verticalVideoCard = element;
 this.changeDetectorRef.detectChanges();
 }
}
