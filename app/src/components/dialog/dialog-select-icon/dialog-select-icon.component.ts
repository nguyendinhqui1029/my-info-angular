import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCustomData } from 'src/model/dialog-custom-data.model';

@Component({
  selector: 'dialog-select-icon',
  templateUrl: './dialog-select-icon.component.html',
  styleUrls: ['./dialog-select-icon.component.scss']
})
export class DialogSelectIconComponent implements OnInit {
  listObjectIcon: any[];
  iconSelected: string;
  constructor(public dialogref: MatDialogRef<DialogSelectIconComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData) {
    this.listObjectIcon = this.data.message;
  }
  getIconSelected(iconName: string) {
    this.iconSelected = iconName;
  }
  action(actionName: string) {
    this.dialogref.close({ value: this.iconSelected, actionName: actionName });
  }
  ngOnInit(): void { }
}
