import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'transformErrorMessage',
  standalone: true
})
export class TransformErrorMessagePipe implements PipeTransform {
  translateService:TranslateService = inject(TranslateService);
  transform(errors: ValidationErrors | null | undefined, params: Record<string, string | boolean>): string {
    if(errors && params['touched']) {
      const errorInfo = Object.entries(errors)[0];
      return this.translateService.instant(errors[errorInfo[0]].errorMessage, params);
    }
    return '';
  }

}
