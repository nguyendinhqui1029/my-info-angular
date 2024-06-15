import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Category } from '@app/shared/models/category.model';
import { ToggleSidebarButtonComponent } from '@components/common/toggle-sidebar-button/toggle-sidebar-button.component';

@Component({
  selector: 'q-vertical-menu-left',
  standalone: true,
  imports: [PrimeComponent, ToggleSidebarButtonComponent],
  templateUrl: './vertical-menu-left.component.html',
  styleUrl: './vertical-menu-left.component.scss'
})
export class VerticalMenuLeftComponent {
  @Input({required: true}) items: Category[] = [];

  @Output() itemClick = new EventEmitter<{ parentId: string; childId?: string; }>();

   parentId = input.required<string>();
   childId = input.required<string>();
}
