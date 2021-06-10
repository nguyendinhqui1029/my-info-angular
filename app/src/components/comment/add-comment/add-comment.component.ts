import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { CommentModel } from 'src/model/comment.model';
import { CommentService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input("idPost") idPost: string;
  @Input("idComment") idComment: string;
  @Output("bindingCommentHtml") bindingCommentHtml = new EventEmitter<any>();
  commentService: CommentService;
  formCommentGroup: FormGroup;
  constructor(private ls: LocatorService, private formBuilder: FormBuilder) {
    this.commentService = this.ls.getService('commentService');
  }

  ngOnInit(): void {
    this.formCommentGroup = this.formBuilder.group({
      contentComment: ['', Validators.required]
    });
  }

  addComment() {
    if (!this.formCommentGroup.invalid) {
      const comment = new CommentModel();
      comment.id = Guid.create().toJSON().value;
      comment.idCommentator = Guid.create().toJSON().value; //TODO: update after
      comment.idAnwser = this.idComment || '0';
      comment.idPost = this.idPost;
      comment.content = this.formCommentGroup.controls.contentComment.value;
      comment.date = moment().format("YYYY-MM-DD HH:mm:ss");
      this.commentService.addComment(comment).subscribe(result => {
        if (result.status === 200) {
          this.bindingCommentHtml.emit(result.body);
        }
      });
    }
  }


}
