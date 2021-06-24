import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogUpdateComponent } from 'src/components/dialog/dialog-update/dialog-update.component';
import { DialogCustomComponent } from 'src/components/dialog/dialog.component';
import { Post } from 'src/model/post.model';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';
import * as moment from 'moment';
import { CategoryService } from 'src/service';
import { CategoryModel } from 'src/model/category.model';
import { resourceLimits } from 'worker_threads';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'delete-post',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeletePostComponent implements OnInit {
  displayedColumns: string[] = ['select', 'title', 'subContent', 'category', 'view', 'rating', 'action'];
  dataSource = new MatTableDataSource<Post>([]);
  selection = new SelectionModel<Post>(true, []);
  postService: PostService;
  categoryService: CategoryService;
  constructor(private dialog: MatDialog, private ls: LocatorService, private _formBuilder: FormBuilder) {
    this.postService = this.ls.getService<PostService>('postService');
    this.categoryService = this.ls.getService('categoryService');
  }

  ngOnInit(): void {
    if (!this.dataSource.data.length) {
      console.log(1)
      this.getAllPost().subscribe(listDataPost => {
        this.dataSource = new MatTableDataSource<Post>(listDataPost);
      });
    }
  }

  getAllPost(): Observable<any> {
    return new Observable((subscrition) => {
      this.postService.getAllPost().subscribe(result => {
        if (result.status == 200 && result.body.length) {
          const listDataPost = [];
          result.body.some((post, index) => {
            this.getCategoryById(post.category).pipe(
              map((category) => {
                const newPost = Object.assign(post);
                newPost.category = category;
                listDataPost.push(newPost);
              })
            ).subscribe(() => {
              if (index >= (result.body.length - 1)) {
                subscrition.next(listDataPost);
                subscrition.complete();
              }
            });
          })
        }
      });
    });
  }
  getCategoryById(id: string): Observable<any> {
    return new Observable((subscrition) => {
      this.categoryService.getCategoryByID(id).subscribe(result => {
        if (result.status === 200) {
          subscrition.next(result.body);
          subscrition.complete();
        }
      });
    });
  }
  isAllSelected() {
    /** Whether the number of selected elements matches the total number of rows. */
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Post): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(idPost: string) {
    const resultAfterDialogClose = this.dialog.open(DialogCustomComponent, {
      data: {
        listButton: [
          { name: 'ok', actionName: 'ok', background: 'black', color: 'white' }
        ],
        message: "question_delete",
        title: 'warning',
        showButtonClose: true
      }
    })
    resultAfterDialogClose.afterClosed().subscribe(data => {
      if (data && data.actionName === 'ok') {
        this.postService.deletePostByID(idPost).subscribe(reponse => {
          const idPostDeleted = reponse.body.id;
          const ind = this.dataSource.data
            .findIndex(post => { return post.id === idPostDeleted });
          if (ind > -1) {
            this.dataSource.data.splice(ind, 1);
            this.dataSource = new MatTableDataSource<Post>(this.dataSource.data);
          }
        });
      }
    });
  }

  updateItem(item: Post) {
    const resultAfterDialogClose = this.dialog.open(DialogUpdateComponent, {
      height: '90%',
      width: '80%',
      data: {
        listButton: [
          { name: 'Update', actionName: 'ok', background: 'black', color: 'white' }
        ],
        message: { component: this.ls.getComponent('updatePostComponent') },
        title: 'Update Post',
        showButtonClose: true,
        formGroup: this._formBuilder.group({
          titlePost: [item.title, Validators.required],
          category: [item.category, Validators.required],
          content: [item.contentDetail]
        })
      }
    })
    resultAfterDialogClose.afterClosed().subscribe(data => {
      if (data && data.actionName === 'ok') {
        const post = new Post();
        post.id = item.id;
        post.title = data.value.value.titlePost;
        post.contentDetail = data.value.value.content;
        post.urlVideo = '';
        post.urlThumnail = '';
        post.date = moment('05-06-2021');
        post.listImage = [];
        post.view = 10000000;
        post.status = 1;
        post.rating = 5;
        post.category = data.value.value.category;

        this.postService.updatePost(post).subscribe(reponse => {
          const postUpdated = reponse.body;
          const ind = this.dataSource.data
            .findIndex(post => { return post.id === postUpdated.id });
          if (ind > -1) {
            this.dataSource.data[ind] = postUpdated;
            this.dataSource = new MatTableDataSource<Post>(this.dataSource.data);
          }
        })
      }
    });
  }
}
