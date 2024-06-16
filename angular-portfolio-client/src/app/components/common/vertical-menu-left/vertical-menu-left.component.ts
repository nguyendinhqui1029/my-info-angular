import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, input } from '@angular/core';
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
export class VerticalMenuLeftComponent implements OnChanges {

  @Input({ required: true }) items: Category[] = [];
  @Input({ required: true }) parentId!: string;
  @Input({ required: true }) childId!: string;
  @Input({ required: true }) isOpen: boolean = false;

  @Output() itemClick = new EventEmitter<{ parentId: string; childId?: string; }>();

  sectionMenuLeftWidth: string = '14.75rem';
  isToggle: boolean = false;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue !== null) {
      this.isToggle = changes['isOpen']?.currentValue;
      this.sectionMenuLeftWidth = this.isToggle ? '14.75rem' : '0rem';
    }
  }
  
  handleToggleSidebar(isOpen: boolean) {
    this.isToggle = isOpen;
    this.sectionMenuLeftWidth = this.isToggle ? '14.75rem' : '0rem';
  }

  handleItemClick(parentId: string, childId?: string) {
    this.parentId = parentId
    this.itemClick.next({parentId: parentId, childId: childId})
  }
}
