import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  @Input("dataDynamic") dataDynamic: FormGroup;

  constructor() { }

  ngOnInit(): void {

  }

  setValue(value) {
    this.dataDynamic.controls.content.setValue(value);
  }

  getValue() {
    return this.dataDynamic.controls.content.value;
  }
}
