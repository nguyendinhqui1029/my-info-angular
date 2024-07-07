import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { FilterOptions } from '@app/shared/models/filter.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-filter-form',
  standalone: true,
  imports: [PrimeComponent, TranslateModule, FormsModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnChanges{
  @Input({required: true}) items: FilterOptions[] = [];
  @Output() eventClick = new EventEmitter<Record<string, string>>();
  
  initialValue: Record<string, string> = {};
  currentValue: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['items'].currentValue) {
      changes['items'].currentValue.forEach((item: FilterOptions) => {
        this.initialValue[item.key] = item.initialValue;
        this.currentValue[item.key] = item.initialValue;
      });
    }
  }

  handleResetFilter() {
    this.eventClick.next(this.initialValue);
  }

  handleSubmitFilter() {
    this.eventClick.next(this.currentValue);
  }
}
