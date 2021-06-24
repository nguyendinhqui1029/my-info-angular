import { Component, Input, OnInit } from '@angular/core';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'header-comment',
  templateUrl: './header-comment.component.html',
  styleUrls: ['./header-comment.component.scss']
})
export class HeaderCommentComponent implements OnInit {
  @Input("date") date: string;
  @Input("avatar") avatar: string;
  @Input("name") name: string;
  constructor(private ls: LocatorService) {

  }

  ngOnInit(): void {

  }

}
