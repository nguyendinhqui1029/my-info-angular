import { Component, Input, OnInit } from '@angular/core';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'footer-comment',
  templateUrl: './footer-comment.component.html',
  styleUrls: ['./footer-comment.component.scss']
})
export class FooterCommentComponent implements OnInit {
  @Input("idPost") idPost: string;
  @Input("idComment") idComment: string;
  isShowComment: boolean = false;
  constructor(private ls: LocatorService) {

  }

  ngOnInit(): void {

  }

  replyComment() {
    this.isShowComment = !this.isShowComment;
  }
}
