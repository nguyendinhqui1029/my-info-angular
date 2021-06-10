import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/model/menu.model';
import { environment } from '../environments/environment';
@Injectable()
export class MenuService {
  url: string = environment.api.url;
  config: any;
  constructor(private http: HttpClient) {
    this.config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

  }

  getAllMenu(): Observable<any> {
    return this.http.get(`${this.url}/get-all-menu`, this.config);
  }

  getMenuByType(type: string): Observable<any> {
    return this.http.get(`${this.url}/get-all-menu/${type}`, this.config);
  }
}