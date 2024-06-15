import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';

@Component({
  selector: 'q-login-dialog',
  standalone: true,
  imports: [PrimeComponent, ContainerChangeSizeDirective],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  loginWrapper!: ContainerSize;

  handleLoginWrapperChangeSize(element: ContainerSize) {
    this.loginWrapper = element;
    this.changeDetectorRef.detectChanges();
  }
}
