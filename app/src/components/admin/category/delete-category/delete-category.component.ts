import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogUpdateComponent } from 'src/components/dialog/dialog-update/dialog-update.component';
import { DialogCustomComponent } from 'src/components/dialog/dialog.component';
import { Post } from 'src/model/post.model';
import { LocatorService } from 'src/service/locator.service';
import { CategoryService } from 'src/service';
import { CategoryModel } from 'src/model/category.model';

@Component({
  selector: 'delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'title', 'status', 'action'];
  dataSource = new MatTableDataSource<Post>([]);
  selection = new SelectionModel<Post>(true, []);
  categoryService: CategoryService;
  constructor(private dialog: MatDialog, private ls: LocatorService, private _formBuilder: FormBuilder) {
    this.categoryService = this.ls.getService<CategoryService>('categoryService');
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(allCategory => {
      this.dataSource = new MatTableDataSource<Post>(allCategory.body);
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

  deleteItem(idCategory: string) {
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
      if (data.actionName === 'ok') {
        this.categoryService.deleteCategoryByID(idCategory).subscribe(reponse => {
          if (reponse.status === 200) {
            const idCategoryDeleted = reponse.body.id;
            const ind = this.dataSource.data
              .findIndex(category => { return category.id === idCategoryDeleted });
            if (ind > -1) {
              this.dataSource.data.splice(ind, 1);
              this.dataSource = new MatTableDataSource<Post>(this.dataSource.data);
            }
          }
        });
      }
    });
  }

  updateItem(item: Post) {
    const resultAfterDialogClose = this.dialog.open(DialogUpdateComponent, {
      width: '60%',
      data: {
        listButton: [
          { name: 'Update', actionName: 'ok', background: 'black', color: 'white' }
        ],
        message: { component: this.ls.getComponent('updateCategoryComponent') },
        title: 'Update Category',
        showButtonClose: true,
        formGroup: this._formBuilder.group({
          title: [item.title, Validators.required],
          status: [item.status, Validators.required],
        })
      }
    })
    resultAfterDialogClose.afterClosed().subscribe(data => {
      if (data.actionName === 'ok') {
        const category = new CategoryModel();
        category.id = item.id;
        category.title = data.value.value.title;
        category.status = data.value.value.status;

        this.categoryService.updateCategory(category).subscribe(reponse => {
          const categoryUpdated = reponse.body;
          const ind = this.dataSource.data
            .findIndex(category => { return category.id === categoryUpdated.id });
          if (ind > -1) {
            this.dataSource.data[ind] = categoryUpdated;
            this.dataSource = new MatTableDataSource<Post>(this.dataSource.data);
          }
        })
      }
    });
  }
}
