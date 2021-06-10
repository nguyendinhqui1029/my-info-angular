import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Button } from 'src/model/button.model';
import { DialogCustomData } from 'src/model/dialog-custom-data.model';

@Component({
  selector: 'dialog-custom',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogCustomComponent implements OnInit {
  constructor(public dialogref: MatDialogRef<DialogCustomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData) { }
  action(actionName: string) {
    this.dialogref.close({ key: 1, value: 'test dialog', actionName: actionName });
  }
  ngOnInit(): void { }
}
