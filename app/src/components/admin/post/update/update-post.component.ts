import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/model/category.model';
import { CategoryService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';

@Component({
  selector: 'update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  @Input("dataDynamic") dataDynamic: FormGroup;
  categoryService: CategoryService;
  postService: PostService;

  categoryList: CategoryModel;
  constructor(private ls: LocatorService) {
    this.categoryService = this.ls.getService('categoryService');
    this.postService = this.ls.getService('postService');
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(result => {
      if (result.status === 200) {
        this.categoryList = result.body;
      }
    });
    const contentPost = this.dataDynamic.controls.content.value;
    this.postService.eventAddPostSucces.next(contentPost);
  }

  setValue(value) {
    this.dataDynamic.controls.content.setValue(value);
  }
}
