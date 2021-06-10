import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from 'src/model/comment.model';
import { environment } from '../environments/environment';
@Injectable()
export class CommentService {
  url: string = environment.api.url;
  config: any;
  constructor(private http: HttpClient) {
    this.config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  }

  getCommentByIdAnwser(idAnwser: string): Observable<any> {
    return this.http.get(`${this.url}/get-comment-by-anwser/${idAnwser}`, this.config);
  }

  deleteCommentByID(id: string): Observable<any> {
    return this.http.delete(`${this.url}/delete-comment/${id}`, this.config);
  }

  updateComment(comment: CommentModel): Observable<any> {
    return this.http.put(`${this.url}/update-comment`, comment);
  }

  addComment(comment: CommentModel): Observable<any> {
    return this.http.post(`${this.url}/add-comment`, comment);
  }
}