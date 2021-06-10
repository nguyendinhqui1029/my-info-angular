import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../../model/card.model';


@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardModel: CardModel;

  constructor() {

  }

  ngOnInit(): void { }
}
