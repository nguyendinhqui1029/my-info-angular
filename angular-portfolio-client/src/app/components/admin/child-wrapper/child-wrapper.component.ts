import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'q-child-wrapper',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './child-wrapper.component.html',
  styleUrl: './child-wrapper.component.scss'
})
export class ChildWrapperComponent {

}
