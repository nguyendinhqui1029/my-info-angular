import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';

@Component({
  selector: 'q-admin-menu-top',
  standalone: true,
  imports: [
    ContainerSizePipe,
    ContainerChangeSizeDirective],
  templateUrl: './admin-menu-top.component.html',
  styleUrl: './admin-menu-top.component.scss'
})
export class AdminMenuTopComponent {
  @Input() isHiddenToggleButton:boolean = false;
  @Output() eventToggleMenuClick = new EventEmitter<void>();

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  adminMenuTopWrapper: Record<string, ContainerSize> = {};
  handleAdminMenuTopWrapperWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.adminMenuTopWrapper = element;
    this.changeDetectorRef.detectChanges();
  }
  handleToggleMenu() {
    if(!this.isHiddenToggleButton) {
      this.eventToggleMenuClick.next();
    }
  }
}
