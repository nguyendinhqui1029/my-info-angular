import { Component } from '@angular/core';
import { AdminMenuLeftComponent } from '@app/components/admin/admin-menu-left/admin-menu-left.component';
import { AdminMenuTopComponent } from '@app/components/admin/admin-menu-top/admin-menu-top.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [PrimeComponent, AdminMenuLeftComponent, AdminMenuTopComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
}
