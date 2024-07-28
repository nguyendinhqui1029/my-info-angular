import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { RequestOptions } from '@shared/models/request.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  http: HttpClient = inject(HttpClient);

  get<T>(url: string, options: RequestOptions): Observable<T> {
    const apiUrl = environment.isUseMock ? options.mockFile : `${environment.apiUrl}/${url}`;
    return this.http.get<T>(apiUrl, options.httpRequestOptions).pipe(catchError((error: HttpErrorResponse) => {
      // Handle error
      if(error.status === 404) {
        return this.http.get<T>(options.mockFile);
      }
      throw error;
    }));
  }

  post<T>(url: string, body: any, options: RequestOptions): Observable<T> {
    const apiUrl = environment.isUseMock ? options.mockFile : `${environment.apiUrl}/${url}`;
    return this.http.post<T>(apiUrl, body, options.httpRequestOptions);
  }

  put<T>(url: string, body: any, options: RequestOptions): Observable<T> {
    const apiUrl = environment.isUseMock ? options.mockFile : `${environment.apiUrl}/${url}`;
    return this.http.put<T>(apiUrl, body, options.httpRequestOptions);
  }

  delete<T>(url: string, options: RequestOptions): Observable<T> {
    const apiUrl = environment.isUseMock ? options.mockFile : `${environment.apiUrl}/${url}`;
    return this.http.delete<T>(apiUrl, options.httpRequestOptions);
  }
}
