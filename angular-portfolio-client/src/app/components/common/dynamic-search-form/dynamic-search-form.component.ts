import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { SearchFormConfig } from '@app/shared/models/search-form.model';

@Component({
  selector: 'q-dynamic-search-form',
  standalone: true,
  imports: [FormsModule, PrimeComponent, ContainerChangeSizeDirective],
  templateUrl: './dynamic-search-form.component.html',
  styleUrl: './dynamic-search-form.component.scss'
})
export class DynamicSearchFormComponent implements OnChanges {
  @Input({ required: true }) fieldConfig: SearchFormConfig[] = [];
  @Input({ required: true }) column!: number;
  @Output() eventClick = new EventEmitter<Record<string, string | string[] | boolean | Date | null>>();

  initialValue: Record<string, string | string[] | boolean | null> = {};
  currentValue: Record<string, string | string[] | boolean | null> = {};
  currentColumn: number = 1;
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Element Container 
  dynamicSearchFormWrapper: Record<string, ContainerSize> = {};
  handleDynamicSearchFormWrapperChangeSize(element: Record<string, ContainerSize>) {
    const MAX_WIDTH_ITEM = 264;
    this.dynamicSearchFormWrapper = element;
    const maxWidth = this.dynamicSearchFormWrapper['1568'].width + this.dynamicSearchFormWrapper['1568'].paddingLeft + this.dynamicSearchFormWrapper['1568'].paddingRight;
    const nexColumn = Math.floor( maxWidth / MAX_WIDTH_ITEM);
    this.currentColumn =  nexColumn <= this.column ? nexColumn : (this.column || 1);
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['column']?.currentValue) {
      this.currentColumn = changes['column'].currentValue;
    }
    if (changes['fieldConfig']?.currentValue) {
      changes['fieldConfig'].currentValue.forEach((item: SearchFormConfig) => {
        this.initialValue[item.key] = item.initialValue;
        this.currentValue[item.key] = item.initialValue;
      });
    }
  }

  handleResetSearchForm() {
    this.currentValue = { ...this.initialValue };
    this.eventClick.next(this.initialValue);
  }

  handleSubmitSearch() {
    this.eventClick.next(this.currentValue);
  }
}
