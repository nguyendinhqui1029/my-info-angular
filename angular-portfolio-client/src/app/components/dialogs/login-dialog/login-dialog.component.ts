import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';

@Component({
  selector: 'q-login-dialog',
  standalone: true,
  imports: [PrimeComponent, ContainerChangeSizeDirective, ContainerSizePipe],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  loginWrapper!: Record<string,ContainerSize>;

  handleLoginWrapperChangeSize(element: Record<string,ContainerSize>) {
    this.loginWrapper = element;
  this.changeDetectorRef.detectChanges();
  }
}
