import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@environments/environment';
import { LocalStorageKey } from '@app/constants/common.const';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private platformId: Object = inject(PLATFORM_ID);
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const locale = isPlatformBrowser(this.platformId) && !!localStorage.getItem(LocalStorageKey.language) ? localStorage.getItem(LocalStorageKey.language)!.toString() : environment.defaultLanguage;
    const cloneRequest = request.clone({
      headers: request.headers.set('locale', locale)
    });
    return next.handle(cloneRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        console.error('Intercepted error:', error);
        return throwError(() => error);
      })
    );
  }
}