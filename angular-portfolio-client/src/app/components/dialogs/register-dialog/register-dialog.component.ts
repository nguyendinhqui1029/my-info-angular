import { Component, signal } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';

@Component({
  selector: 'q-register-dialog',
  standalone: true,
  imports: [PrimeComponent, ContainerChangeSizeDirective],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {

  isDisplayMessage = signal<boolean>(false);

  // Element Container 
  registerWrapper!: ContainerSize;

  handleLoginWrapperChangeSize(element: ContainerSize) {
    this.registerWrapper = element;
  }
}
