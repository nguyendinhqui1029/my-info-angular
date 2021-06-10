import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { Post } from 'src/model/post.model';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';
@Component({
  selector: 'add-post',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPostComponent implements OnInit {
  formAddPost: FormGroup;
  postService: PostService
  isDisable: boolean = false;
  constructor(private _formBuilder: FormBuilder, private ls: LocatorService) {
    this.postService = this.ls.getService('postService');
  }

  ngOnInit(): void {
    this.formAddPost = this._formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
      urlVideo: [''],
      urlThumnail: [''],
      date: [moment()],
      listImage: [''],
      view: ['', Validators.required],
      status: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  setValue(value) {
    this.formAddPost.controls.content.setValue(value);
  }

  getValue() {
    return this.formAddPost.controls.content.value;
  }

  savePost() {
    let post = new Post();
    this.formAddPost.controls.id.setValue(Guid.create().toJSON().value);
    this.formAddPost.controls.date.setValue(moment());
    this.formAddPost.controls.id.updateValueAndValidity();
    this.formAddPost.controls.date.updateValueAndValidity();
    post = this.formAddPost.value;
    post.contentDetail = this.formAddPost.controls.content.value;
    if (this.formAddPost.invalid === false) {
      this.isDisable = true;
      this.postService.addPost(post).subscribe(result => {
        if (result.status === 200) {
          this.formAddPost.reset();
          this.isDisable = false;
        }
      });
    }
  }
}
