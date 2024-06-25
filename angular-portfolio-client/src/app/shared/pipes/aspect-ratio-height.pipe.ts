import { Pipe, PipeTransform } from '@angular/core';
import { getHeightAspectRatioVideo } from '@utils/common.util';

@Pipe({
  name: 'aspectRatioHeight',
  standalone: true
})
export class AspectRatioHeightPipe implements PipeTransform {

  transform(value: number): number {
    return getHeightAspectRatioVideo(value);
  }

}
