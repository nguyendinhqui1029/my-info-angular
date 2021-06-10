import { Component, Input, OnInit } from '@angular/core';
import { ErrorValidate } from 'src/model/error-validate.model';

@Component({
  selector: 'input-custom',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input('controlName') controlName: string;
  @Input('placeholder') placeholder: string;
  @Input('lable') lable: string;
  @Input('listError') listError: ErrorValidate[];
  @Input('isRequire') isRequire: boolean;
  constructor() { }

  ngOnInit(): void { }
}
