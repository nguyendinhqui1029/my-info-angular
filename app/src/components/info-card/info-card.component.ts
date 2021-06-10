import { Component, Input, OnInit } from '@angular/core';
import { InfoCardModel } from 'src/model/info-card.model';


@Component({
  selector: 'info-card-component',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  @Input() infoCardModel: InfoCardModel;

  constructor() {

  }

  ngOnInit(): void { }
}
