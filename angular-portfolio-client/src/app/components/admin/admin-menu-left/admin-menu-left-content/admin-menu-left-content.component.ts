import { Router, RouterModule } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import { AdminMenu } from '@app/shared/models/menu.mode';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-admin-menu-left-content',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './admin-menu-left-content.component.html',
  styleUrl: './admin-menu-left-content.component.scss'
})
export class AdminMenuLeftContentComponent {
  @Input() items: AdminMenu[] = [];
}
