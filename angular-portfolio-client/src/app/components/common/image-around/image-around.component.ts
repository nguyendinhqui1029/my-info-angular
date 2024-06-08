import { Component, Input } from '@angular/core';

@Component({
  selector: 'q-image-around',
  standalone: true,
  imports: [],
  templateUrl: './image-around.component.html',
  styleUrl: './image-around.component.scss'
})
export class ImageAroundComponent {
  @Input({required: true}) images!:string[];
}
