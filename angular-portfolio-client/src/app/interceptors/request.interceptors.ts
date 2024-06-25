import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add custom logic here before sending the request
    // console.log('Intercepted request:', request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        console.error('Intercepted error:', error);
        return throwError(() => error);
      })
    );
  }
}