import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'q-vertical-image-card',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './vertical-image-card.component.html',
  styleUrl: './vertical-image-card.component.scss'
})
export class VerticalImageCardComponent {
 @Input({required: true}) id!: string;
 @Input({required: true}) imageUrl: string = ''; 
 @Input({required: false}) date: string = ''; 
 @Input({required: true}) content: string = ''; 
 @Input({required: true}) title: string = ''; 

 @Output() eventClick = new EventEmitter<string>();
}
