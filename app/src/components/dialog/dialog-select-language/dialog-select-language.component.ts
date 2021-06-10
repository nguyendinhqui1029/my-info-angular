import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCustomData } from 'src/model/dialog-custom-data.model';

@Component({
  selector: 'select-language',
  templateUrl: './dialog-select-language.component.html',
  styleUrls: ['./dialog-select-language.component.scss']
})
export class DialogSelectLanguageComponent implements OnInit {
  selectLanguage: boolean = true;
  constructor(public dialogref: MatDialogRef<DialogSelectLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData) {
    this.selectLanguage = localStorage.getItem("lang") === 'vi' ? true : false;
  }
  changeLanguage() {
    this.selectLanguage = !this.selectLanguage;
  }
  action(actionName: string) {
    this.dialogref.close({ value: this.selectLanguage ? 'vi' : 'en', actionName: actionName });
  }
  ngOnInit(): void { }
}
