import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Experience } from '@app/shared/models/personal-info.model';

@Component({
  selector: 'q-experience',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  @Input({ required: true }) experience!: Experience;
  @Output() eventClick = new EventEmitter<void>();
}
