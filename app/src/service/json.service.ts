import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JsonService {
  constructor(private http: HttpClient) {

  }

  public getJSON(urlFile: string): Observable<any> {
    return this.http.get(urlFile);
  }
}