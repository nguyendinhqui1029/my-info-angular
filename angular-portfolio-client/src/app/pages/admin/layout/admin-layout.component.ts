import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AdminMenuLeftComponent } from '@app/components/admin/admin-menu-left/admin-menu-left.component';
import { AdminMenuTopComponent } from '@app/components/admin/admin-menu-top/admin-menu-top.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [
    PrimeComponent, 
    AdminMenuLeftComponent, 
    AdminMenuTopComponent,
    ContainerSizePipe,
    ContainerChangeSizeDirective
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  MENU_LEFT_MAX_WIDTH = '15.25rem';
  menuLeftMaxWidth: string = this.MENU_LEFT_MAX_WIDTH;
  // Element Container 
  adminLayoutWrapper: Record<string, ContainerSize> = {};
  isHiddenToggleButton: boolean = false;
  handleAdminLayoutWrapperWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.adminLayoutWrapper = element;
    this.isHiddenToggleButton = !this.adminLayoutWrapper['630'].isMaxWidthMatch;
    this.menuLeftMaxWidth = this.adminLayoutWrapper['630'].isMaxWidthMatch ? '0rem' : this.MENU_LEFT_MAX_WIDTH;
    this.changeDetectorRef.detectChanges();
  }
  
  handleSetWidthMenuLeft() {
    this.menuLeftMaxWidth = this.menuLeftMaxWidth === this.MENU_LEFT_MAX_WIDTH ? '0rem' : this.MENU_LEFT_MAX_WIDTH;
  }

  handleCloseMenu(shouldBeClose: boolean) {
    if(shouldBeClose && !this.isHiddenToggleButton) {
      this.menuLeftMaxWidth = '0rem';
    }
  }
}
