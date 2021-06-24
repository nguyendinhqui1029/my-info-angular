import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'footer-comment',
  templateUrl: './footer-comment.component.html',
  styleUrls: ['./footer-comment.component.scss']
})
export class FooterCommentComponent implements OnInit {
  @Input("idPost") idPost: string;
  @Input("idComment") idComment: string;
  @Input("childComment") childComment?: any;
  isShowComment: boolean = false;

  commentService: CommentService;
  contentDefault: string;
  numberChildComment: number;
  constructor(private ls: LocatorService) {
    this.commentService = this.ls.getService('commentService');
  }

  ngOnInit(): void {
    this.numberChildComment = this.childComment ? this.childComment.length : 0;
  }

  seeMoreReply(idComment: string) {
    console.log(this.childComment)
  }

  replyComment() {
    this.isShowComment = !this.isShowComment;
    this.contentDefault = '';
  }

  showEditForm() {
    this.commentService.getCommentByIdComment(this.idComment).subscribe(result => {
      if (result.status === 200) {
        this.contentDefault = result.body.content;
        this.isShowComment = true;
      }
    });
  }

  closeFormComment() {
    this.isShowComment = false;
  }
}
