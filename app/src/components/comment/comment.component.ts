import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CommentService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'comment-section',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentSectionComponent implements OnInit {
  commentService: CommentService;
  formCommentGroup: FormGroup;
  isPost: string;
  listComment: any[] = [];
  a: string = '<footer-comment [idPost]="isPost" [idComment]="comment.id">233</footer-comment>'
  constructor(private ls: LocatorService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.commentService = this.ls.getService('commentService');

  }

  ngOnInit(): void {
    this.commentService.getCommentByIdAnwser('0').subscribe(result => {
      this.mapDataCommentRoot(result.body).forEach(com => {
        const a = this.jointListComment(com);
      });
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isPost = params.id;
    });
  }

  editComment(idPost: string, idComment: string, idUser: string) {
    alert(1)
  }


  mapDataCommentRoot(listComment: any[]) {
    if (listComment && listComment.length > 0) {
      listComment.some(comment => {
        this.commentService.getCommentByIdAnwser(comment.id).subscribe(result => {
          comment["childComment"] = [];
          if (result.body && result.body.length) {
            result.body.some(com => {
              com["parentContent"] = comment.content;
              comment["childComment"].push(com);
            });
          }
          if (comment["childComment"].length > 0) this.mapDataCommentRoot(comment["childComment"]);
        });
      })
      return listComment;
    }
  }


  bindingCommentHtml(data) {
    this.commentService.getCommentByIdAnwser('0').subscribe(result => {
      this.listComment = [];
      this.mapDataCommentRoot(result.body).forEach(com => {
        this.listComment.concat(this.jointListComment(com));
      });
    });
  }

  jointListComment(comment: any): any[] {
    const listCom = [];
    listCom.push(comment);
    if (comment.childComment && comment.childComment.length > 0) {
      listCom.concat(comment.childComment);
    }
    return listCom;
  }
}
