import { HttpContext, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

export interface RequestOptions {
  mockFile: string;
  locale?: string;
  httpRequestOptions?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: any;
    context?: HttpContext;
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
  }
}