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
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  formAddCategory: FormGroup;
  categoryService: CategoryService
  isDisable: boolean = false;
  constructor(private _formBuilder: FormBuilder, private ls: LocatorService) {
    this.categoryService = this.ls.getService('categoryService');
  }

  ngOnInit(): void {
    this.formAddCategory = this._formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      status: ['', Validators.required],
      isProgrammingLanguage: [false, Validators.required]
    });
  }


  savePost() {
    let category = new CategoryModel();
    this.formAddCategory.controls.id.setValue(Guid.create().toJSON().value);
    this.formAddCategory.controls.id.updateValueAndValidity();
    category = this.formAddCategory.value;
    if (this.formAddCategory.invalid === false) {
      this.isDisable = true;
      this.categoryService.addCategory(category).subscribe(result => {
        if (result.status === 200) {
          this.formAddCategory.reset();
          this.isDisable = false;
        }
      });
    }
  }
}
