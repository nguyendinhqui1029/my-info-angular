import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { TableHeaderConfig } from '@app/shared/models/table.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-custom-table',
  standalone: true,
  imports: [CommonModule, PrimeComponent, TranslateModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent<T> {
  @Input({required: true}) dataHeaderTable: TableHeaderConfig[] = [];
  @Input({required: true}) dataTable: T[] = [];
  @ContentChild('headerTemplate') headerTemplate: TemplateRef<any> | null = null;
  @ContentChild('contentRowTemplate') contentRowTemplate: TemplateRef<any> | null = null;

}
