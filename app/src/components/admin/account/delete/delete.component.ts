import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCustomComponent } from 'src/components/dialog/dialog.component';

export interface PeriodicElement {
  id: string;
  name: string;
  position: number;
  email: number;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: '1', position: 1, name: 'Hydrogen', email: 1.0079, phone: 'H' },
  { id: '2', position: 2, name: 'Helium', email: 4.0026, phone: 'He' },
  { id: '3', position: 3, name: 'Lithium Lithium Lithium Lithium Lithium', email: 6.941, phone: 'Li' },
  { id: '4', position: 4, name: 'Beryllium', email: 9.0122, phone: 'Be' },
  { id: '5', position: 5, name: 'Boron', email: 10.811, phone: 'B' },
  { id: '6', position: 6, name: 'Carbon', email: 12.0107, phone: 'C' },
  { id: '7', position: 7, name: 'Nitrogen', email: 14.0067, phone: 'N' },
  { id: '8', position: 8, name: 'Oxygen', email: 15.9994, phone: 'O' },
  { id: '9', position: 9, name: 'Fluorine', email: 18.9984, phone: 'F' },
  { id: '10', position: 10, name: 'Neon', email: 20.1797, phone: 'Ne' },
];
@Component({
  selector: 'delete-account',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'email', 'phone', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(id) {
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

      }
    });
  }

  updateItem(id) {

  }
}
