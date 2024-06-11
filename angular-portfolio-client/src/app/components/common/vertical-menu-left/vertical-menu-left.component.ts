import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject, input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Category } from '@app/shared/models/category.model';

@Component({
  selector: 'q-vertical-menu-left',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './vertical-menu-left.component.html',
  styleUrl: './vertical-menu-left.component.scss'
})
export class VerticalMenuLeftComponent {
  @Input({required: true}) items: Category[] = [];
  @Output() itemClick = new EventEmitter<{ parentId: string; childId?: string; }>();

   parentId = input.required<string>();
   childId = input.required<string>();
}
