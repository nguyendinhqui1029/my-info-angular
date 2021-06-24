import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { CategoryModel } from 'src/model/category.model';
import { Post } from 'src/model/post.model';
import { CategoryService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';
@Component({
  selector: 'add-post',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPostComponent implements OnInit {
  formAddPost: FormGroup;
  postService: PostService;
  categoryService: CategoryService;
  isDisable: boolean = false;
  categoryList: CategoryModel;
  constructor(private _formBuilder: FormBuilder, private ls: LocatorService) {
    this.postService = this.ls.getService('postService');
    this.categoryService = this.ls.getService('categoryService');
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(result => {
      if (result.status === 200) {
        this.categoryList = result.body;
      }
    });

    this.formAddPost = this._formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      subContent: ['', Validators.required],
      content: ['', Validators.required],
      urlVideo: [''],
      urlThumnail: [''],
      date: [moment()],
      listImage: [''],
      view: [0],
      status: ['', Validators.required],
      rating: [0]
    });
    this.postService.eventAddPostSucces.next('');
  }

  setValue(value) {
    this.formAddPost.controls.content.setValue(value);
  }
  resetValueAllForm() {
    this.formAddPost.controls.view.setValue(0);
    this.formAddPost.controls.rating.setValue(0);
    this.formAddPost.controls.title.setValue('');
    this.formAddPost.controls.category.setValue('');
    this.formAddPost.controls.subContent.setValue('');
    this.formAddPost.controls.content.setValue('');
    this.formAddPost.controls.urlVideo.setValue('');
    this.formAddPost.controls.status.setValue('');
    this.postService.eventAddPostSucces.next('');
  }
  savePost() {
    let post = new Post();
    this.formAddPost.controls.id.setValue(Guid.create().toJSON().value);
    this.formAddPost.controls.date.setValue(moment());
    this.formAddPost.controls.id.updateValueAndValidity();
    this.formAddPost.controls.date.updateValueAndValidity();
    post = this.formAddPost.value;
    post.contentDetail = this.formAddPost.controls.content.value;
    if (!this.formAddPost.invalid) {
      this.isDisable = true;
      this.postService.addPost(post).subscribe(result => {
        if (result.status === 200) {
          this.isDisable = false;
          this.formAddPost.patchValue(null);
          this.resetValueAllForm();
        }
      });
    }
  }
}
