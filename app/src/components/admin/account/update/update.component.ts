import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent } from 'src/components/dialog/dialog.component';

@Component({
  selector: 'update-account',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  formUpdateAccount: FormGroup;
  showChangePass: boolean = false;
  selectedFiles: File;
  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formUpdateAccount = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });

  }

  changeCheckBox(event) {
    this.showChangePass = event;
    if (this.showChangePass) {
      this.formUpdateAccount.addControl("password", new FormControl());
      this.formUpdateAccount.addControl("repassword", new FormControl());
      this.formUpdateAccount.addControl("newpassword", new FormControl());
    } else {
      this.formUpdateAccount.removeControl("password");
      this.formUpdateAccount.removeControl("repassword");
      this.formUpdateAccount.removeControl("newpassword");
    }
  }

  resetAccount() {
    const resultAfterDialogClose = this.dialog.open(DialogCustomComponent, {
      data: {
        listButton: [
          { name: 'Ok', actionName: 'ok', background: 'black', color: 'white' }
        ],
        message: "question_reset",
        title: 'warning',
        showButtonClose: true
      }
    })
    resultAfterDialogClose.afterClosed().subscribe(data => {
      if (data.actionName === 'ok') {
        this.formUpdateAccount.reset();
        this.showChangePass = false;
      }
    });
  }

  click() { }

  selectFile(data) {
    if (navigator.userAgent.search('firefox')) {
      this.selectedFiles = data.target.files[0];
    } else {
      this.selectedFiles = data.srcElement.files[0];
    }

    console.log(this.selectedFiles)
  }
}
