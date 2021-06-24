import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from 'src/model/post.model';
import { environment } from '../environments/environment';
@Injectable()
export class PostService {
  url: string = environment.api.url;
  config: any;
  eventAddPostSucces: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private http: HttpClient) {
    this.config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAllPost(): Observable<any> {
    return this.http.get(`${this.url}/get-all-post`, this.config);
  }

  getPostByID(id: string): Observable<any> {
    return this.http.get(`${this.url}/get-post-by-id/${id}`, this.config);
  }

  getPostByIdCategory(idCategory: string): Observable<any> {
    return this.http.get(`${this.url}/get-post-by-category/${idCategory}`, this.config);
  }

  deletePostByID(id: string): Observable<any> {
    return this.http.delete(`${this.url}/delete-post/${id}`, this.config);
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.url}/update-post`, post);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post(`${this.url}/add-post`, post);
  }
}