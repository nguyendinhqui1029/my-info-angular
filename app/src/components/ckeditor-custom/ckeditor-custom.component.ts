import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';
@Component({
  selector: 'ckeditor-custom',
  templateUrl: './ckeditor-custom.component.html',
  styleUrls: ['./ckeditor-custom.component.scss']
})
export class CkeditorCustomComponent implements OnInit {
  @Output("valueChange") valueChange = new EventEmitter();
  configCkeditor: any;
  destroyTimeout: any;

  postService: PostService;
  value: string;
  constructor(private ls: LocatorService) {
    this.postService = this.ls.getService('postService');
    this.configCkeditor = {
      extraPlugins: 'codesnippet',
      filebrowserBrowseUrl: 'http://localhost:3000/api/v1/load-image-list',
      filebrowserUploadUrl: 'http://localhost:3000/api/v1/upload-image'
    }
  }

  ngOnInit(): void {
    this.postService.eventAddPostSucces.subscribe((value) => {
      this.value = value;
    })
  }

  setValue() {
    this.destroyTimeout = setTimeout(() => {
      this.valueChange.emit(this.value);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.destroyTimeout) {
      clearTimeout(this.destroyTimeout);
    }
  }
}
