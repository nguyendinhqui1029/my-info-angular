import { Component, signal } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'q-register-dialog',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {

  isDisplayMessage = signal<boolean>(false);
}
