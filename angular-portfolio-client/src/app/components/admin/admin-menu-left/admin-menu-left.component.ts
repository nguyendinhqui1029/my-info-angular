import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MenuService } from '@app/shared/services/menu.service';
import { AdminMenuLeftContentComponent } from '@components/admin/admin-menu-left/admin-menu-left-content/admin-menu-left-content.component';

@Component({
  selector: 'q-admin-menu-left',
  standalone: true,
  imports: [AdminMenuLeftContentComponent],
  templateUrl: './admin-menu-left.component.html',
  styleUrl: './admin-menu-left.component.scss'
})
export class AdminMenuLeftComponent {
  @Output() eventClick = new EventEmitter<boolean>();
  
  private menuService: MenuService = inject(MenuService);

  menuItems = this.menuService.getAdminMenu().result;
  
}
