import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { IntroduceMySelf } from '@app/shared/models/personal-info.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-introduce-myself',
  standalone: true,
  imports: [PrimeComponent, TranslateModule],
  templateUrl: './introduce-myself.component.html',
  styleUrl: './introduce-myself.component.scss'
})
export class IntroduceMyselfComponent {
  @Input({ required: true }) introduce!: IntroduceMySelf;
  @Output() eventClick = new EventEmitter<void>();
}
