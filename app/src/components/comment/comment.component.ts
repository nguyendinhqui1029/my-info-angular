import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService, CommentService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'comment-section',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentSectionComponent implements OnInit {
  commentService: CommentService;
  authService: AuthService;
  formCommentGroup: FormGroup;
  isPost: string;
  listComment: any[] = [];
  constructor(private ls: LocatorService, private activatedRoute: ActivatedRoute) {
    this.commentService = this.ls.getService('commentService');
    this.authService = this.ls.getService('authService');
  }

  ngOnInit(): void {
    this.getValueForComments();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.isPost = params.id;
    });

    this.commentService.eventUpdateCommentToUI.subscribe(() => {
      this.getValueForComments();
    });
  }

  getValueForComments() {
    this.commentService.getCommentByIdAnwser('0').subscribe(result => {
      this.listComment = result.body;
      this.mapDataCommentRoot(this.listComment);
    });
  }

  mapDataCommentRoot(listComment: any[]) {
    if (listComment && listComment.length > 0) {
      listComment.some(comment => {
        this.authService.getUserById(comment.idCommentator).subscribe(result => {
          if (result.status === 200) {
            comment["user"] = result.body;
          }
        });
        this.commentService.getCommentByIdAnwser(comment.id).subscribe(result => {
          comment["childComment"] = [];
          if (result.body && result.body.length) {
            comment["childComment"] = result.body;
          }
          if (comment["childComment"].length > 0) this.mapDataCommentRoot(comment["childComment"]);
        });
      })
    }
  }
}
