import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ckeditor-custom',
  templateUrl: './ckeditor-custom.component.html',
  styleUrls: ['./ckeditor-custom.component.scss']
})
export class CkeditorCustomComponent implements OnInit {
  @Input("value") value: string;
  @Output("valueChange") valueChange = new EventEmitter();
  configCkeditor: any;
  destroyTimeout: any;
  constructor() {
    this.configCkeditor = {
      extraPlugins: 'codesnippet',
      filebrowserBrowseUrl: 'http://localhost:3000/api/v1/load-image-list',
      filebrowserUploadUrl: 'http://localhost:3000/api/v1/upload-image'
    }
  }

  ngOnInit(): void {

  }

  setValue() {
    this.destroyTimeout = setTimeout(() => {
      this.valueChange.emit(this.value);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.destroyTimeout) {
      clearInterval(this.destroyTimeout);
    }
  }
}
