import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/model/category.model';
import { Post } from 'src/model/post.model';
import { environment } from '../environments/environment';
@Injectable()
export class CategoryService {
  url: string = environment.api.url;
  config: any;
  constructor(private http: HttpClient) {
    this.config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.url}/get-all-category`, this.config);
  }

  getCategoryByID(idCategory: string): Observable<any> {
    return this.http.get(
      `${this.url}/get-category-by-id/${idCategory}`,
      this.config
    );
  }

  getCategoryIsProgramming(): Observable<any> {
    return this.http.get(
      `${this.url}/get-category-is-programming`,
      this.config
    );
  }

  deleteCategoryByID(idCategory: string): Observable<any> {
    return this.http.delete(`${this.url}/delete-category/${idCategory}`);
  }

  updateCategory(category: CategoryModel): Observable<any> {
    return this.http.put(`${this.url}/update-category`, category);
  }

  addCategory(category: CategoryModel): Observable<any> {
    return this.http.post(`${this.url}/add-category`, category);
  }
}