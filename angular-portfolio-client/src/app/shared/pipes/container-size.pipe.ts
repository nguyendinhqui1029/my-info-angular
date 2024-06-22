import { Pipe, PipeTransform } from '@angular/core';
import { ContainerSize } from '@shared/models/container-size.mode';

@Pipe({
  name: 'containerSize',
  standalone: true
})
export class ContainerSizePipe implements PipeTransform {

  transform(value: Record<string, ContainerSize>, propertyWidth: string): ContainerSize {
    if(value && Object.keys(value).includes(propertyWidth)) {
      return value[propertyWidth];
    }
    
    return {
      height: 0,
      width: 0, 
      paddingTop: 0, 
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      isMinWidthMatch: false,
      isMaxWidthMatch: false,
      isMaxHeightMatch: false,
      isMinHeightMatch: false,
    };
  }

}
