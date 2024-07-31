import { Pipe, PipeTransform } from '@angular/core';
import { format } from "date-fns";

@Pipe({
  name: 'formatDateWithZone',
  standalone: true
})
export class FormatDateWithZonePipe implements PipeTransform {

  transform(value: string | Date, formatDate?: string): unknown {
    if(typeof value === 'string') {
      return format(new Date(value), formatDate || 'dd-MM-yyyy hh:mm (x)');
    }
    if(value instanceof Date) {
      return format(value, formatDate || 'dd-MM-yyyy hh:mm (x)');
    }
    return '';
  }

}
