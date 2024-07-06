import { Component } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'q-not-found-404',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './not-found-404.component.html',
  styleUrl: './not-found-404.component.scss'
})
export class NotFound404Component {

}
