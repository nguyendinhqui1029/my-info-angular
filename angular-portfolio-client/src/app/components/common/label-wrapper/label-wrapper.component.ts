import { Component, Input } from '@angular/core';

@Component({
  selector: 'q-label-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './label-wrapper.component.html',
  styleUrl: './label-wrapper.component.scss'
})
export class LabelWrapperComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: false }) message!: string;
  @Input({ required: false }) isRequired!: boolean;

}
