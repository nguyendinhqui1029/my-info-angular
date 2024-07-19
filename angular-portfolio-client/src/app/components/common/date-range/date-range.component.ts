import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'q-date-range',
  standalone: true,
  imports: [FormsModule, PrimeComponent],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent implements ControlValueAccessor {
  @Input({required: false}) startDateLabel: string = 'Start date'; 
  @Input({required: false}) endDateLabel: string = 'End date'; 
  @Input({required: false}) startDateMessage: string = ''; 
  @Input({required: false}) endDateMessage: string = ''; 
  @Input({required: false}) isDisableStartDate: boolean = false; 
  @Input({required: false}) isDisableEndDate: boolean = false;
  @Input({required: false}) isShowTime: boolean = false;

  
  startDate!: Date | null;
  endDate!: Date | null;

  private onChange!: Function;
  private onTouched!: Function;

  writeValue(value: any): void {
    if (value) {
      this.startDate = value.startDate;
      this.isDisableEndDate = !value.startDate;
      this.endDate = value.endDate;
    }
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  startDateChanged() {
    this.onChange({ startDate: this.startDate, endDate: this.endDate });
    this.isDisableEndDate = !this.startDate;
  }

  endDateChanged() {
    this.onChange({ startDate: this.startDate, endDate: this.endDate });
  }

  onBlur() {
    this.onTouched();
  }

}
