import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSelectIconComponent } from 'src/components/dialog/dialog-select-icon/dialog-select-icon.component';
import { DialogCustomComponent } from 'src/components/dialog/dialog.component';
import { JsonService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'add-menu',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddMenuComponent implements OnInit {
  formGroupAddMenu: FormGroup;
  showFormGroupAddChildrenMenu: boolean = false;
  constructor(private ls: LocatorService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroupAddMenu = this._formBuilder.group({
      lable: ['', Validators.required],
      url: ['', Validators.required],
      showOrHidden: [true, Validators.required],
      alias: [''],
      icon: [''],
      children: new FormArray([])
    });
  }

  changeAddSubMenu() {
    this.showFormGroupAddChildrenMenu = !this.showFormGroupAddChildrenMenu;
    if (this.showFormGroupAddChildrenMenu) {
      (this.formGroupAddMenu.controls.children as FormArray).controls.push(this._formBuilder.group({
        lableChilren: ['', Validators.required],
        urlChilren: ['', Validators.required],
        showOrHiddenChilren: [true, Validators.required],
        aliasChilren: [''],
        iconChilren: ['']
      }));
    } else {
      (this.formGroupAddMenu.controls.children as FormArray).controls = [];
    }
    (this.formGroupAddMenu.controls.children as FormArray).updateValueAndValidity();
  }

  addChildrenMenu() {
    (this.formGroupAddMenu.controls.children as FormArray).controls.push(this._formBuilder.group({
      lableChilren: ['', Validators.required],
      urlChilren: ['', Validators.required],
      showOrHiddenChilren: [true, Validators.required],
      aliasChilren: [''],
      iconChilren: ['']
    }));
    (this.formGroupAddMenu.controls.children as FormArray).updateValueAndValidity();
  }

  removeChildrenMenu(index: number) {
    (this.formGroupAddMenu.controls.children as FormArray).removeAt(index);
    if ((this.formGroupAddMenu.controls.children as FormArray).controls.length === 0) {
      this.showFormGroupAddChildrenMenu = false;
    }
  }

  openDialogIcon(iconControl) {
    this.ls.getService<JsonService>('jsonService').getJSON('./assets/config/list-icon.json').subscribe(listIcon => {
      const resultFromDialog = this.dialog.open(DialogSelectIconComponent, {
        data: {
          listButton: [
            { name: 'Ok', actionName: 'ok', background: 'black', color: 'white' }
          ],
          message: listIcon,
          title: 'title_select_icon',
          showButtonClose: false
        }
      });
      resultFromDialog.afterClosed().subscribe(data => {
        if (data.actionName === 'ok' && data.value) {
          iconControl.setValue(data.value);
          iconControl.updateValueAndValidity();
        }
      });
    });
  }

  opentDialogReset() {
    const resultFromDialog = this.dialog.open(DialogCustomComponent, {
      data: {
        listButton: [
          { name: 'Ok', actionName: 'ok', background: 'black', color: 'white' }
        ],
        message: "question_reset",
        title: 'warning',
        showButtonClose: false
      }
    });
    resultFromDialog.afterClosed().subscribe(data => {
      if (data.actionName === 'ok') {
        this.formGroupAddMenu.reset();
      }
    });
  }
}
