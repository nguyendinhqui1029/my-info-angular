import { Component, Input, OnInit } from '@angular/core';
import { TitleModel } from '../../model/title.model';

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() titleModel: TitleModel;

  constructor() {

  }

  ngOnInit(): void { }
}
