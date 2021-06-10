import { Component, Input, OnInit } from '@angular/core';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'header-comment',
  templateUrl: './header-comment.component.html',
  styleUrls: ['./header-comment.component.scss']
})
export class HeaderCommentComponent implements OnInit {
  @Input("date") date: string;
  @Input("avatar") avatar: string = "https://material.angular.io/assets/img/examples/shiba2.jpg";
  @Input("name") name: string;
  @Input("idComment") idComment: string;
  constructor(private ls: LocatorService) {

  }

  ngOnInit(): void {

  }

  editComment() {
    alert(1)
  }

}
